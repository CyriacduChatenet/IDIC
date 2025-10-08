import { BadGatewayException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  public async sendSignupMail(reciever: string) {
    try {
      await this.mailerService.sendMail({
        to: reciever,
        from: this.configService.get('MAILER_EMAIL'),
        subject: 'Welcome to Travel Tailor',
        template: 'signup',
        context: {
          reciever,
          url: this.configService.get<string>('CLIENT_APP_URL'),
        },
      });
    } catch (error) {
      console.error('Error sending signup email:', error);
      throw new BadGatewayException('Failed to send signup email');
    }
  }

  public async sendForgotPasswordMail(reciever: string, resetLink: string) {
    try {
      await this.mailerService.sendMail({
        to: reciever,
        from: this.configService.get('MAILER_EMAIL'),
        subject: 'Reset password demand',
        template: 'forgot-password',
        context: {
          resetLink,
          reciever,
          url: this.configService.get<string>('CLIENT_APP_URL'),
        },
      });
    } catch (error) {
      console.error('Error sending forgot password email:', error);
      throw new BadGatewayException('Failed to send forgot password email');
    }
  }

  public async sendConfirmResetPasswordMail(reciever: string) {
    try {
      await this.mailerService.sendMail({
        to: reciever,
        from: this.configService.get('MAILER_EMAIL'),
        subject: 'Your password has been reset',
        template: 'reset-password',
        context: {
          reciever,
          url: this.configService.get<string>('CLIENT_APP_URL'),
        },
      });
    } catch (error) {
      console.error('Error sending confirm reset password email:', error);
      throw new BadGatewayException(
        'Failed to send confirm reset password email',
      );
    }
  }
}
