import httpStatus from "http-status";
import { AppError } from "../error/AppError";
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";



const authValidation = (...requiredRoles:TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
      //auth validation implement here
      const token = req.headers.authorization;
      // check if the token send form client
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      // check if the token is valid
      const decoded =  jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
          //   const {userId,role} = decoded;
          const {role, userId, email, iat} = decoded;

          const user = await User.isUserExistsByid(userId);
          // checking if the user is exist
          if (!user) {
            throw new AppError(
              httpStatus.NOT_FOUND,
              'This user is not found !!',
            );
          }
          const userByEmail = await User.isUserExistsByEmail(email);
          // checking if the user is exist
          if (!userByEmail) {
            throw new AppError(
              httpStatus.NOT_FOUND,
              'This user is not found !!',
            );
          }

          // //checking if the user is already deleted
          if (await User.isUserDeleted(userId)) {
            throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !!');
          }

          if (
            user?.passwordChangeAt &&
            (await User.isJwtIssuedBeforePasswordChanged(
              user.passwordChangeAt,
              iat as number,
            ))
          ) {
            throw new AppError(
              httpStatus.UNAUTHORIZED,
              'You are not authorized!!!!!',
            );
          }

            if (requiredRoles && !requiredRoles.includes(role)) {
              throw new AppError(
                httpStatus.UNAUTHORIZED,
                'You are not authorized!!',
              );
            }

          req.user = decoded as JwtPayload;
          next();
        
    },
  );
};

export default authValidation;