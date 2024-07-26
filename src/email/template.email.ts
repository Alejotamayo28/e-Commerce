import nodemailer from 'nodemailer'
import { emailData } from './config.email';

export const transporter = nodemailer.createTransport({
  host: emailData.smtp,
  port: 465,
  secure: true,
  auth: {
    user: emailData.user,
    pass: emailData.password,
  },
});

