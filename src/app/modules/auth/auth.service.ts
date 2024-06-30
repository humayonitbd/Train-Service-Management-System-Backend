/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TJwtPayload, TLoginUser } from "./auth.interface";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";
import { sendImageToCloudinary } from "../../utils/sendImageToCloudinary";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { sendEmail } from "../../utils/sendEmail";
import jwt from 'jsonwebtoken';


const signupService = async (file: any, payload: TUser): Promise<any> => {
  //user existence check
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new Error('User already exists');
  }

  const userPhone = await User.isUserExistsByNumber(payload?.phone);
  if (userPhone) {
    throw new Error('User Number already exists!');
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (file) {
      const imageName = `${payload?.name}-236`;
      const path = file?.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.profileImg = secure_url as string;
    }


    //create user
    const newUser = await User.create([payload], { session });

    await session.commitTransaction();
    await session.endSession();
    return newUser[0];
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error);
  }
};

const loginService = async (payload: TLoginUser) => {
  // console.log(payload,'payload')
  const user = await User.isUserExistsByEmail(payload.email);
  // console.log(user,'user')

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!!');
  }

  const userData = await User.isUserExistsByid(user?._id.toString());
  

  if (!userData?.password) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!!');
  }
  

  // // checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, userData?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !!');
  }

  // Check user data validity
  if (!userData || !userData.email || !userData.role || !userData._id) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user data');
  }

  const jwtPayload: TJwtPayload = {
    email: userData?.email,
    role: userData?.role,
    userId: userData?._id.toString(),
  };
  // create access token and send client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // create refresh token and send client
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  };
};


const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.isUserExistsByid(userData?.userId);
  // checking if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !!');
  }

  // //checking if the user is already deleted
  if (await User.isUserDeleted(userData?.userId)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !!');
  }

  // //checking if the user is already deleted
  if (!await User.isUserExistsByEmail(userData?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !!');
  }

  // // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched !!');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_solt_rounds),
  );



  await User.findOneAndUpdate(
    {
      _id: user?._id,
      role: user?.role,
      email: user?.email,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

  return null;
};

const refreshToken = async (token: string) => {

  const decoded = verifyToken(token, config.jwt_refresh_secret as string);
  //   const {userId,role} = decoded;
  const { userId, iat, email, role } = decoded;

  const user = await User.isUserExistsByid(userId);
  // checking if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !!');
  }

  if (user?.role !== role) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !!');
  }

  // //checking if the user is already deleted
  if (await User.isUserDeleted(userId)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !!');
  }

  // //checking if the user is already blocked
  if (!await User.isUserExistsByEmail(email)) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user is not found by email !!',
    );
  }

  if (
    user?.passwordChangeAt &&
    (await User.isJwtIssuedBeforePasswordChanged(
      user.passwordChangeAt,
      iat as number,
    ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!!!!!');
  }

  // Ensure user data is defined
  if (!user._id || !user.role || !user.email) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user data');
  }

  const jwtPayload: TJwtPayload = {
    userId: user?._id.toString(),
    role: user?.role,
    email: user?.email,
  };
  // create access token and send client
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    accessToken,
  };
};

const forgatePassword = async (userId: string) => {
  const user = await User.isUserExistsByid(userId);
  // checking if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !!');
  }

  // //checking if the user is already deleted
  if (await User.isUserDeleted(userId)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !!');
  }

  // //checking if the user is already blocked
  if (!(await User.isUserExistsByEmail(user?.email))) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'This user is not found by email !!',
    );
  }

  // Ensure user data is defined
  if (!user._id || !user.role || !user.email) {
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, 'Invalid user data');
  }

  const jwtPayload = {
    userId: user?._id.toString(),
    role: user?.role,
    email: user?.email,
  };
  // create access token and send client
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${user?._id}&token=${resetToken}`;

  // console.log('resetUILink', resetUILink);
  sendEmail(user?.email, resetUILink);
};

const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const user = await User.isUserExistsByid(payload.id);
  // checking if the user is exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !!');
  }

  // //checking if the user is already deleted
  if (await User.isUserDeleted(payload.id)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !!');
  }

  // //checking if the user is already blocked
  if (!await User.isUserExistsByEmail(user?.email)) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is not found by email !!');
  }

  const decoded = verifyToken(token, config.jwt_access_secret as string);
  
  if (payload.id !== decoded.userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden !!');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_solt_rounds),
  );

  await User.findOneAndUpdate(
    {
      _id: decoded?.userId,
      role: decoded?.role,
      email: decoded?.email,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangeAt: new Date(),
    },
  );

};

export const AuthServices = {
  signupService,
  loginService,
  changePassword,
  refreshToken,
  forgatePassword,
  resetPassword,
};
