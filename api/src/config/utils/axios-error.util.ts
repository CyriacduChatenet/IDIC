/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AxiosError } from 'axios';

/**
 * Helper centralisé pour transformer les erreurs Axios/Strapi
 * en exceptions NestJS cohérentes.
 */
export function handleAxiosError(err: any, context = 'Strapi request'): never {
  if (err instanceof AxiosError) {
    const status = err.response?.status;
    const data = err.response?.data;
    const message =
      data?.error?.message ||
      data?.message ||
      err.message ||
      'Unknown Strapi error';

    console.error(`[StrapiError:${status}] ${context} -> ${message}`);

    // ✅ Gestion spéciale : erreurs de validation Strapi
    const validationErrors: string[] =
      data?.error?.details?.errors?.map(
        (e: any) => `${e.path?.join('.') || 'field'}: ${e.message}`,
      ) || [];

    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }

    // ✅ Gestion spécifique pour erreurs d’authentification
    if (/invalid.+(identifier|password)/i.test(message)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // ✅ Gestion par code HTTP
    switch (status) {
      case 400:
        throw new BadRequestException(message);
      case 401:
        throw new UnauthorizedException('Unauthorized: invalid token');
      case 403:
        throw new ForbiddenException(
          'You do not have permission to perform this action',
        );
      case 404:
        throw new NotFoundException(`${context} not found`);
      default:
        throw new InternalServerErrorException(
          `Strapi error (${status || 'unknown'}): ${message}`,
        );
    }
  }

  // ✅ fallback pour erreurs non Axios
  console.error(`[UnexpectedError] ${context}:`, err);
  throw new InternalServerErrorException(
    err?.message || `Unexpected error during ${context}`,
  );
}
