import { BadRequestException, Injectable } from '@nestjs/common';

import { StrapiService } from '../strapi/strapi.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { StrapiApiCreateResponse } from '../strapi/interfaces/strapi-api-response.interface';
import { handleAxiosError } from '../config/utils/axios-error.util';
import { AuthDataResponse } from './response/auth.response';
import { CustomerStripeService } from '../stripe/services/customer-stripe.service';
import { UserService } from '../user/user.service';
import { Permission } from '../config/enum/permission.enum';
import { PlayerService } from '../player/player.service';
import { ClubService } from '../club/club.service';
import { SponsorService } from '../sponsor/sponsor.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly strapiService: StrapiService,
    private readonly customerStripeService: CustomerStripeService,
    private readonly userService: UserService,
    private readonly playerService: PlayerService,
    private readonly clubService: ClubService,
    private readonly sponsorService: SponsorService,
  ) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<StrapiApiCreateResponse<AuthDataResponse>> {
    console.log(registerDto);
    try {
      const response = await this.strapiService.postData<AuthDataResponse>(
        'auth/local/register',
        {
          username: registerDto.username,
          email: registerDto.email,
          password: registerDto.password,
        },
      );

      const jwt = response.jwt;
      const strapiUser = response.user;

      const stripeCustomer = await this.customerStripeService.createCustomer(
        strapiUser.email,
        strapiUser.username,
      );

      if (!stripeCustomer) {
        throw new BadRequestException(
          `Failed to create STRIPE_CUSTOMER with EMAIL ${strapiUser.email} and NAME ${strapiUser.username}`,
        );
      }

      switch (response.user.permission) {
        case Permission.Player: {
          console.log('create player');
          const newStrapiPlayer = await this.playerService.create({
            first_name: registerDto.first_name ?? '',
            last_name: registerDto.last_name ?? '',
            birth_date: registerDto.birth_date ?? new Date(),
            phone: registerDto.phone ?? '',
            address: registerDto.address ?? '',
          });

          const updatedStrapiUserPlayer = await this.userService.update(
            strapiUser.id,
            {
              stripe_customer_id: stripeCustomer.id,
              player: `${newStrapiPlayer.data.id}`,
            },
          );

          return { data: { jwt, user: updatedStrapiUserPlayer.data } };
        }
        case Permission.Club: {
          console.log('create club');
          const newStrapiClub = await this.clubService.create({
            name: registerDto.name ?? '',
            address: registerDto.address ?? '',
            phone: registerDto.phone ?? '',
            email: registerDto.email ?? '',
          });

          const updatedStrapiUserClub = await this.userService.update(
            strapiUser.id,
            {
              stripe_customer_id: stripeCustomer.id,
              club: `${newStrapiClub.data.id}`,
            },
          );

          return { data: { jwt, user: updatedStrapiUserClub.data } };
        }
        case Permission.Sponsor: {
          console.log('create sponsor');
          const newStrapiSponsor = await this.sponsorService.create({
            name: registerDto.name ?? '',
            address: registerDto.address ?? '',
            phone: registerDto.phone ?? '',
            description: registerDto.description ?? '',
          });

          const updatedStrapiUserSponsor = await this.userService.update(
            strapiUser.id,
            {
              stripe_customer_id: stripeCustomer.id,
              sponsor: `${newStrapiSponsor.data.id}`,
            },
          );

          return { data: { jwt, user: updatedStrapiUserSponsor.data } };
        }
        default:
          throw new BadRequestException('USER_ROLE is not correct !');
      }
    } catch (err) {
      handleAxiosError(err, 'registering user');
    }
  }

  async login(
    loginDto: LoginDto,
  ): Promise<StrapiApiCreateResponse<AuthDataResponse>> {
    try {
      return await this.strapiService.postData<
        StrapiApiCreateResponse<AuthDataResponse>
      >('auth/local', loginDto);
    } catch (err) {
      handleAxiosError(err, 'logging in user');
    }
  }
}
