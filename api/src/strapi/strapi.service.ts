import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StrapiService {
  private readonly baseUrl: string;
  private readonly token?: string;

  constructor(private readonly httpService: HttpService) {
    this.baseUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    this.token = process.env.STRAPI_TOKEN;
  }

  async getAllData(endpoint: string, populate?: string): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}?${populate ? `populate=${populate}` : ''}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService.get(url, { headers }).toPromise();
    return response?.data;
  }

  async getDataById(endpoint: string, id: string | number): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}/${id}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService.get(url, { headers }).toPromise();
    return response?.data;
  }

  async getDataByField(
    endpoint: string,
    field: string,
    value: string,
  ): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}?filters[${field}][$eq]=${value}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService.get(url, { headers }).toPromise();
    return response?.data;
  }

  async postData(endpoint: string, data: any): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService
      .post(url, data, { headers })
      .toPromise();
    return response?.data;
  }

  async updateData(endpoint: string, data: any): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService
      .put(url, data, { headers })
      .toPromise();
    return response?.data;
  }

  async deleteData(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService
      .delete(url, { headers })
      .toPromise();
    return response?.data;
  }
}
