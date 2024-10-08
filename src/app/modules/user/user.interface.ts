import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  _id:string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role?: keyof typeof USER_ROLE;
  address: string;
  isDeleted: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserExistsByid(id: string): Promise<TUser>;
  isUserExistsByNumber(num: string): Promise<TUser>;
  isUserDeleted(isDeleted: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  
}

export type TUserRole = keyof typeof USER_ROLE;