/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import Stripe from 'stripe';

/**
 * Centralise la gestion des erreurs Stripe
 * et les transforme en exceptions NestJS.
 *
 * @param err - erreur Stripe ou autre
 * @param context - message contextuel pour le log
 */
export function handleStripeError(err: unknown, context = ''): never {
  if (err instanceof Stripe.errors.StripeError) {
    const message = err.message || 'Stripe error';
    const code = (err as any).code;

    switch (code) {
      case 'resource_missing':
        throw new NotFoundException(`Stripe ${context}: ${message}`);
      case 'invalid_request_error':
        throw new BadRequestException(`Stripe ${context}: ${message}`);
      case 'authentication_error':
        throw new UnauthorizedException(`Stripe ${context}: ${message}`);
      case 'api_connection_error':
      case 'api_error':
      default:
        throw new InternalServerErrorException(`Stripe ${context}: ${message}`);
    }
  }

  // Cas générique si ce n'est pas une erreur Stripe
  const fallbackMessage =
    err instanceof Error ? err.message : 'Unexpected error';
  throw new InternalServerErrorException(
    `Stripe ${context}: ${fallbackMessage}`,
  );
}
