import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  NODE_ENV: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  bcrypt_solt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  send_email_auth_user: process.env.SEND_EMAIL_AUTH_USER,
  send_email_auth_pass: process.env.SEND_EMAIL_AUTH_PASS,
  sender_email: process.env.SENDER_EMAIL,
  super_admin_password: process.env.SUPER_ADMIN_PASSWORD,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
};
