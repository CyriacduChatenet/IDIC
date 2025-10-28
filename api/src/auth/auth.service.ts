import { BadRequestException, Injectable } from '@nestjs/common';

import { StrapiService } from '../strapi/strapi.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { StrapiApiCreateResponse } from '../strapi/interfaces/strapi-api-response.interface';
import { handleAxiosError } from '../config/utils/axios-error.util';
import {
  AuthDataResponse,
  ChangePasswordDataResponse,
  ForgotPasswordDataResponse,
} from './response/auth.response';
import { CustomerStripeService } from '../stripe/services/customer-stripe.service';
import { UserService } from '../user/user.service';
import { Permission } from '../config/enum/permission.enum';
import { PlayerService } from '../player/player.service';
import { ClubService } from '../club/club.service';
import { SponsorService } from '../sponsor/sponsor.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { handleEmailError } from '../strapi/utils/email-error.util';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { SendEmailConfirmationDto } from './dto/send-email-confirmation.dto';

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
    try {
      console.log(registerDto);
      const response = await this.strapiService.postData<AuthDataResponse>(
        'auth/local/register',
        {
          username: registerDto.username,
          email: registerDto.email,
          password: registerDto.password,
        },
      );

      const { jwt, user: strapiUser } = response;
      if (!jwt || !strapiUser) {
        throw new BadRequestException('Invalid response from Strapi');
      }

      const stripeCustomer = await this.customerStripeService.createCustomer({
        email: strapiUser.email,
        name: strapiUser.username,
      });
      if (!stripeCustomer) {
        throw new BadRequestException(
          `Failed to create STRIPE_CUSTOMER for ${strapiUser.email}`,
        );
      }

      const updatedUser = await this.createRoleEntityAndUpdateUser(
        strapiUser.id,
        registerDto,
        stripeCustomer.id,
      );

      return { data: { jwt, user: updatedUser } };
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

  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<StrapiApiCreateResponse<ForgotPasswordDataResponse>> {
    try {
      return await this.strapiService.postData<
        StrapiApiCreateResponse<ForgotPasswordDataResponse>
      >('auth/forgot-password', forgotPasswordDto);
    } catch (err) {
      handleEmailError(err, 'forgot password process');
    }
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<StrapiApiCreateResponse<AuthDataResponse>> {
    try {
      return await this.strapiService.postData<
        StrapiApiCreateResponse<AuthDataResponse>
      >('auth/reset-password', resetPasswordDto);
    } catch (err) {
      handleAxiosError(err, 'logging in user');
    }
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
  ): Promise<StrapiApiCreateResponse<ChangePasswordDataResponse>> {
    try {
      return await this.strapiService.postData<
        StrapiApiCreateResponse<ChangePasswordDataResponse>
      >('auth/change-password', changePasswordDto);
    } catch (err) {
      handleAxiosError(err, 'logging in user');
    }
  }

  async sendConfirmationEmail(
    sendEmailConfirmationDto: SendEmailConfirmationDto,
  ): Promise<StrapiApiCreateResponse<{ ok: boolean }>> {
    try {
      return await this.strapiService.postData<
        StrapiApiCreateResponse<{ ok: boolean }>
      >('auth/send-email-confirmation', sendEmailConfirmationDto);
    } catch (err) {
      handleEmailError(err, 'sending confirmation email');
    }
  }

  private async createRoleEntityAndUpdateUser(
    userId: number,
    dto: RegisterDto,
    stripeCustomerId: string,
  ) {
    console.log(dto);
    switch (dto.permission) {
      case Permission.Player: {
        const player = await this.playerService.create({
          first_name: dto.first_name ?? '',
          last_name: dto.last_name ?? '',
          birth_date: dto.birth_date ?? new Date(),
          phone: dto.phone ?? '',
          address: dto.address ?? '',
        });

        const updatedUser = await this.userService.update(userId, {
          stripe_customer_id: stripeCustomerId,
          permission: dto.permission,
          player: `${player.data.id}`,
        });
        return updatedUser.data;
      }

      case Permission.Club: {
        const club = await this.clubService.create({
          name: dto.name ?? '',
          address: dto.address ?? '',
          phone: dto.phone ?? '',
        });

        const updatedUser = await this.userService.update(userId, {
          stripe_customer_id: stripeCustomerId,
          permission: dto.permission,
          club: `${club.data.id}`,
        });
        return updatedUser.data;
      }

      case Permission.Sponsor: {
        const sponsor = await this.sponsorService.create({
          name: dto.name ?? '',
          address: dto.address ?? '',
          phone: dto.phone ?? '',
          description: dto.description ?? '',
        });

        const updatedUser = await this.userService.update(userId, {
          stripe_customer_id: stripeCustomerId,
          permission: dto.permission,
          sponsor: `${sponsor.data.id}`,
        });
        return updatedUser.data;
      }

      default:
        throw new BadRequestException('USER_ROLE is not correct!');
    }
  }
}
