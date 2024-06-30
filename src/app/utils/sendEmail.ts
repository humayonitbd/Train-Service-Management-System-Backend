
import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.NODE_ENV === 'production', // Use `true` for port 465, `false` for all other ports
    auth: {
      user: config.send_email_auth_user,
      pass: config.send_email_auth_pass,
    },
  });

  await transporter.sendMail({
    from: config.sender_email, // sender address
    to, // list of receivers
    subject: 'Reset your password - 10m !! ✔', // Subject line
    text: 'Hello User!!', // plain text body
    html, // html body
  });
};
