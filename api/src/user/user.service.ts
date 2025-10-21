/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { StrapiService } from '../strapi/strapi.service';
import { User } from './entity/user.entity';
import { CustomerStripeService } from '../stripe/services/customer-stripe.service';
import { Permission } from '../config/enum/permission.enum';
import { PlayerService } from '../player/player.service';
import { Player } from '../player/entity/player.entity';
import { ClubService } from '../club/club.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { CreateUserDto } from './dto/create-user.dto';
import { handleAxiosError } from '../config/utils/axios-error.util';
import {
  StrapiApiCreateResponse,
  StrapiApiDeleteResponse,
  StrapiApiFindAllResponse,
  StrapiApiFindOneResponse,
  StrapiApiUpdateResponse,
} from 'src/strapi/interfaces/strapi-api-response.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly strapiService: StrapiService,
    private readonly customerStripeService: CustomerStripeService,
    private readonly playerService: PlayerService,
    private readonly clubService: ClubService,
    private readonly sponsorService: SponsorService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<StrapiApiCreateResponse<User>> {
    try {
      const strapiUser = (await this.strapiService.postData(
        'users',
        createUserDto,
      )) as User;

      const stripeCustomer = await this.customerStripeService.createCustomer(
        strapiUser.email,
        strapiUser.username,
      );

      if (!stripeCustomer) {
        throw new BadRequestException(
          `Failed to create STRIPE_CUSTOMER with EMAIL ${strapiUser.email} and NAME ${strapiUser.username}`,
        );
      }

      switch (createUserDto.permission) {
        case Permission.Player: {
          console.log('create player');
          const newStrapiPlayer = (await this.playerService.create({
            first_name: createUserDto.first_name ?? '',
            last_name: createUserDto.last_name ?? '',
            birth_date: createUserDto.birth_date ?? new Date(),
            phone: createUserDto.phone ?? '',
            address: createUserDto.address ?? '',
          })) as { data: Player };

          const updatedStrapiUserPlayer = await this.update(strapiUser.id, {
            stripe_customer_id: stripeCustomer.id,
            player: `${newStrapiPlayer.data.id}`,
          });

          return updatedStrapiUserPlayer;
        }
        case Permission.Club: {
          console.log('create club');
          const newStrapiClub = await this.clubService.create({
            name: createUserDto.name ?? '',
            address: createUserDto.address ?? '',
            phone: createUserDto.phone ?? '',
            email: createUserDto.email ?? '',
          });

          const updatedStrapiUserClub = await this.update(strapiUser.id, {
            stripe_customer_id: stripeCustomer.id,
            club: `${newStrapiClub.data.id}`,
          });

          return updatedStrapiUserClub;
        }
        case Permission.Sponsor: {
          console.log('create sponsor');
          const newStrapiSponsor = await this.sponsorService.create({
            name: createUserDto.name ?? '',
            address: createUserDto.address ?? '',
            phone: createUserDto.phone ?? '',
            description: createUserDto.description ?? '',
          });

          const updatedStrapiUserSponsor = await this.update(strapiUser.id, {
            stripe_customer_id: stripeCustomer.id,
            sponsor: `${newStrapiSponsor.data.id}`,
          });

          return updatedStrapiUserSponsor;
        }
        default:
          throw new BadRequestException('USER_ROLE is not correct !');
      }
    } catch (err) {
      handleAxiosError(err, 'creating user');
    }
  }

  findAll(): Promise<StrapiApiFindAllResponse<User>> {
    try {
      return this.strapiService.getAllData('users', '*');
    } catch (err) {
      handleAxiosError(err, 'fetching userss');
    }
  }

  findOne(id: string): Promise<StrapiApiFindOneResponse<User>> {
    try {
      return this.strapiService.getDataById(`users/${id}`, '*');
    } catch (err) {
      handleAxiosError(err, `fetching user with ID ${id}`);
    }
  }

  findOneByEmail(email: string): Promise<StrapiApiFindOneResponse<User>> {
    try {
      return this.strapiService.getDataByField('users', 'email', email);
    } catch (err) {
      handleAxiosError(err, `fetching user with EMAIL ${email}`);
    }
  }

  update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<StrapiApiUpdateResponse<User>> {
    try {
      return this.strapiService.updateData(`users/${id}`, updateUserDto);
    } catch (err) {
      handleAxiosError(err, `updating user with ID ${id}`);
    }
  }

  remove = async (id: string): Promise<StrapiApiDeleteResponse<User>> => {
    try {
      const strapiUser = (await this.strapiService.getDataById(
        `users/${id}`,
        '*',
      )) as User;

      const stripeCustomer = await this.customerStripeService.retrieveCustomer(
        strapiUser.stripe_customer_id,
      );

      if (!stripeCustomer) {
        throw new NotFoundException(
          `STRIPE_CUSTOMER is not found with CUSTOMER_ID ${strapiUser.stripe_customer_id}`,
        );
      }

      if (strapiUser.stripe_customer_id === null) {
        throw new BadRequestException(`STRIPE_CUSTOMER_ID is null`);
      }

      if (strapiUser.player !== null) {
        const strapiPlayer = (await this.playerService.findOne(
          strapiUser.player.documentId,
        )) as { data: Player };

        await this.playerService.remove(strapiPlayer.data.documentId);
        const deletedStrapiUser = (await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        )) as unknown as User;

        return { data: deletedStrapiUser };
      } else if (strapiUser.club !== null) {
        const strapiClub = await this.clubService.findOne(
          strapiUser.club.documentId,
        );

        await this.clubService.remove(strapiClub.data.documentId);
        const deletedStrapiUser = (await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        )) as unknown as User;

        return { data: deletedStrapiUser };
      } else if (strapiUser.sponsor !== null) {
        const strapiSponsor = await this.sponsorService.findOne(
          strapiUser.sponsor.documentId,
        );

        await this.sponsorService.remove(strapiSponsor.data.documentId);
        const deletedStrapiUser = (await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        )) as unknown as User;
        return { data: deletedStrapiUser };
      } else {
        const deletedStrapiUser = (await this.strapiService.deleteData(
          `users/${strapiUser.id}`,
        )) as unknown as User;
        return { data: deletedStrapiUser };
      }
    } catch (err) {
      handleAxiosError(err, `deleting user with ID ${id}`);
    }
  };
}
