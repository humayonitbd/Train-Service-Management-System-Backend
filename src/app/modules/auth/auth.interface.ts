import { Types } from "mongoose";

export type TLoginUser = {
  email: string;
  password: string;
};


export type TJwtPayload = {
  email: string;
  role: string;
  userId: string;
};