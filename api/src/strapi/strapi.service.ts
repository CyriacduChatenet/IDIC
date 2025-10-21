import { Injectable } from '@nestjs/common';
import { StrapiApiRequestRepository } from './interfaces/strapi-api-request.interface';

@Injectable()
export class StrapiService {
  constructor(
    private readonly strapiApiRequestRepository: StrapiApiRequestRepository,
  ) {}

  async getAllData<T>(endpoint: string, populate?: string): Promise<T> {
    const params = populate ? { populate } : undefined;
    return this.strapiApiRequestRepository.get<T>(endpoint, params);
  }

  async getDataById<T>(endpoint: string, populate?: string): Promise<T> {
    const params = populate ? { populate } : undefined;
    return this.strapiApiRequestRepository.get<T>(endpoint, params);
  }

  async getDataByField<T>(
    endpoint: string,
    field: string,
    value: string,
  ): Promise<T> {
    const params = { [`filters[${field}][$eq]`]: value };
    return this.strapiApiRequestRepository.get<T>(endpoint, params);
  }

  async postData<T>(endpoint: string, data: any): Promise<T> {
    return this.strapiApiRequestRepository.post<T>(endpoint, data);
  }

  async updateData<T>(endpoint: string, data: any): Promise<T> {
    return this.strapiApiRequestRepository.put<T>(endpoint, data);
  }

  async deleteData<T>(endpoint: string): Promise<T> {
    return this.strapiApiRequestRepository.delete<T>(endpoint);
  }
}
