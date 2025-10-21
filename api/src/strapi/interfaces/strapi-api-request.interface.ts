import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

import { handleAxiosError } from '../../config/utils/axios-error.utils';

export class StrapiApiRequestRepository {
  private readonly baseUrl: string;
  private readonly token?: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    this.token = process.env.STRAPI_TOKEN;
  }

  public async get<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = this.token
        ? { Authorization: `Bearer ${this.token}` }
        : {};
      const response = await lastValueFrom(
        this.httpService.get<T>(url, { headers, params }),
      );
      return response.data;
    } catch (err) {
      handleAxiosError(err, `GET ${endpoint}`);
    }
  }

  public async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = this.token
        ? { Authorization: `Bearer ${this.token}` }
        : {};
      const response = await lastValueFrom(
        this.httpService.post<T>(url, data, { headers }),
      );
      return response.data;
    } catch (err) {
      handleAxiosError(err, `POST ${endpoint}`);
    }
  }

  public async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = this.token
        ? { Authorization: `Bearer ${this.token}` }
        : {};
      const response = await lastValueFrom(
        this.httpService.put<T>(url, data, { headers }),
      );
      return response.data;
    } catch (err) {
      handleAxiosError(err, `PUT ${endpoint}`);
    }
  }

  public async delete<T>(endpoint: string): Promise<T> {
    try {
      const url = `${this.baseUrl}/${endpoint}`;
      const headers = this.token
        ? { Authorization: `Bearer ${this.token}` }
        : {};
      const response = await lastValueFrom(
        this.httpService.delete<T>(url, { headers }),
      );
      return response.data;
    } catch (err) {
      handleAxiosError(err, `DELETE ${endpoint}`);
    }
  }
}
