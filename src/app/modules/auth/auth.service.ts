/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { TJwtPayload, TLoginUser } from "./auth.interface";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";
import { createToken, verifyToken } from "./auth.utils";
import config from "../../config";


const signupService = async (payload: TUser): Promise<any> => {
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

  const userData = await User.isUserExistsByid((user?._id) as string);
  

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
    
  };
};


export const AuthServices = {
  signupService,
  loginService,
};
