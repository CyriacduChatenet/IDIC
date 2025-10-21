/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';

import { StrapiService } from '../strapi/strapi.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { handleAxiosError } from '../config/utils/axios-error.utils';

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
      handleAxiosError(err, 'registering user');
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
      handleAxiosError(err, 'logging in user');
    }
  }
}
