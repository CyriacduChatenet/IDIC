/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { StrapiService } from '../strapi/strapi.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AxiosError } from 'axios';

@Injectable()
export class AuthService {
  constructor(private readonly strapiService: StrapiService) {}

  async register(registerDto: RegisterDto) {
    try {
      const response = await this.strapiService.postData(
        'auth/local/register',
        registerDto,
      );
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        const message =
          err.response?.data?.error?.message ||
          err.response?.data?.message ||
          err.message ||
          'Unknown error from Strapi';

        switch (status) {
          case 400:
            throw new BadRequestException(message);
          case 401:
            throw new UnauthorizedException('Invalid credentials');
          case 500:
            throw new BadRequestException('Email or username already exists');
          default:
            throw new InternalServerErrorException(
              `Strapi error (${status || 'unknown'}): ${message}`,
            );
        }
      }

      throw new InternalServerErrorException(
        err?.message || 'Unexpected server error',
      );
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const response = await this.strapiService.postData(
        'auth/local',
        loginDto,
      );
      return response;
    } catch (err) {
      if (err instanceof AxiosError) {
        const status = err.response?.status;
        const message =
          err.response?.data?.error?.message ||
          err.response?.data?.message ||
          err.message ||
          'Unknown error from Strapi';

        switch (status) {
          case 400:
            throw new BadRequestException(message);
          case 401:
            throw new UnauthorizedException('Invalid credentials');
          case 404:
            throw new BadRequestException('User not found');
          default:
            throw new InternalServerErrorException(
              `Strapi error (${status || 'unknown'}): ${message}`,
            );
        }
      }

      throw new InternalServerErrorException(
        err?.message || 'Unexpected server error',
      );
    }
  }
}
