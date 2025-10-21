import { Injectable } from '@nestjs/common';

import { StrapiService } from '../strapi/strapi.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { StrapiApiCreateResponse } from '../strapi/interfaces/strapi-api-response.interface';
import { handleAxiosError } from '../config/utils/axios-error.utils';
import { AuthDataResponse } from './response/auth.response';

@Injectable()
export class AuthService {
  constructor(private readonly strapiService: StrapiService) {}

  async register(
    registerDto: RegisterDto,
  ): Promise<StrapiApiCreateResponse<AuthDataResponse>> {
    try {
      return await this.strapiService.postData<
        StrapiApiCreateResponse<AuthDataResponse>
      >('auth/local/register', registerDto);
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
