import { Request, Response, NextFunction } from 'express';
import * as nodemailer from 'nodemailer';
import { MailOptionsInterface } from '../Interfaces/MailOptionsInterface';
import Mail from 'nodemailer/lib/mailer';
import config from '../config/config';

export class Mailer {
  public transporter: Mail;
  public mailOptions: MailOptionsInterface = {
    from: '',
    to: '',
    subject: '',
    text: '',
    html: '',
  };

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: config.email,
        pass: config.mailPassword,
      },
    });
  }

  public setMailOptions(to: string, subject: string, message: string) {
    this.mailOptions['from'] = config.email;
    this.mailOptions['to'] = to;
    this.mailOptions['subject'] = subject;
    this.mailOptions.text = message;
  }

  public sendNotification(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(this.mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          reject(false);
        } else {
          console.log('Email sent: ', info.response);
          resolve(true);
        }
      });
    });
  }
}
