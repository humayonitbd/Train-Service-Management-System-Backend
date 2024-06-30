import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export type TUser = {
  _id(_id: any): unknown;
  name: string;
  email: string;
  password: string;
  needsPasswordChange?: boolean;
  passwordChangeAt?: Date;
  phone: string;
  role?: keyof typeof USER_ROLE;
  address: string;
  profileImg?: string;
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
  isJwtIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;