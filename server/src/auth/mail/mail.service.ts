import { Injectable } from "@nestjs/common";
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email', // Почтовый сервер
    port: 587,
    secure: false,
    auth: {
      user: 'alfonzo.turcotte93@ethereal.email',
      pass: 'dDzkUgHvxP6qyqHPdA'
    }
  });

  async sendEmailConfirmation(email: string, token: string) {
    const confirmationUrl = `http://localhost:3000/auth/email-confirmation/${token}`;

    await this.transporter.sendMail({
      from: '"Cookie Music" <your-email@example.com>',
      to: email,
      subject: 'Please confirm your email on Cookie Music',
      text: "Confirm your email",
      html: `<b>Click <a href="${confirmationUrl}">here</a> to confirm your email</b>`
    }, (err, info) => {
      if (err) {
        console.log('Error occurred. ' + err.message);
      }

      console.log('Message sent: ', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
    });
  }
}
