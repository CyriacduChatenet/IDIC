/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';

/**
 * Helper to handle email-related errors:
 * - Invalid email format
 * - Nonexistent email/user
 * - Unavailable email service
 * - Generic internal errors
 */
export function handleEmailError(
  error: any,
  context: string = 'email process',
): never {
  const message =
    error?.response?.data?.error?.message ||
    error?.response?.data?.message ||
    error?.message ||
    'Unknown email error';

  const status = error?.response?.status;
  const normalizedMessage = message.toLowerCase();

  // 🧩 Specific error handling
  if (
    normalizedMessage.includes('invalid email') ||
    normalizedMessage.includes('email must be a valid') ||
    normalizedMessage.includes('invalid identifier')
  ) {
    throw new BadRequestException(
      `Invalid email address during ${context}. Please check the format.`,
    );
  }

  if (
    normalizedMessage.includes('user not found') ||
    normalizedMessage.includes('no such user') ||
    normalizedMessage.includes('cannot find user') ||
    normalizedMessage.includes('email not found')
  ) {
    throw new NotFoundException(
      `No user found with this email during ${context}.`,
    );
  }

  if (
    normalizedMessage.includes('mail') ||
    normalizedMessage.includes('email plugin not installed') ||
    normalizedMessage.includes('cannot send email') ||
    normalizedMessage.includes('email provider not found') ||
    normalizedMessage.includes('mailer')
  ) {
    throw new ServiceUnavailableException(
      `The email service is currently unavailable during ${context}. Please try again later.`,
    );
  }

  // 🧠 Handle common HTTP statuses safely
  if (status) {
    switch (status) {
      case 400:
        throw new BadRequestException(`Email error: ${message}`);
      case 404:
        throw new NotFoundException(`Email not found: ${message}`);
      case 503:
        throw new ServiceUnavailableException(
          `Email service unavailable: ${message}`,
        );
    }
  }

  // ✅ If nothing matches, assume it's not an email-related issue
  throw new BadRequestException(
    `Unexpected email error during ${context}: ${message}`,
  );
}
