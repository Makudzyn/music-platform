import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'smtp',
      host: this.configService.get<string>('HOSTNAME'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USERNAME'),
        pass: this.configService.get<string>('MAIL_PASSWORD'),
      },
    } as nodemailer.TransportOptions);
  }

  async sendEmailConfirmation(email: string, token: string) {
    const confirmationUrl = `${this.configService.get<string>('CLIENT_URL')}/auth/email-confirmation/${token}`;

    await this.transporter.sendMail(
      {
        from: '"Cookie Music" <your-email@example.com>',
        to: email,
        subject: 'Please confirm your email on Cookie Music',
        text: 'Confirm your email',
        html: `<b>Click <a href="${confirmationUrl}">here</a> to confirm your email</b>`,
      },
      (err, info) => {
        if (err) {
          console.log('Error occurred. ' + err.message);
        }
      },
    );
  }
}
