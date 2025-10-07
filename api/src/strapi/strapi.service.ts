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

  async getData(endpoint: string): Promise<any> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    const response = await this.httpService.get(url, { headers }).toPromise();
    return response?.data;
  }
}
