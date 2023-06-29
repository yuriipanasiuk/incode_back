import { Types } from "mongoose";
import { Request } from "express";

export interface IUser {
  _id: Types.ObjectId;
  fullName: string;
  userName: string;
  password: string;
  accessToken?: string;
  refreshToken?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomRequest extends Request {
  user?: IUser;
}

export interface IValidateRegisterSchema {
  name: string;
  email: string;
  password: string;
}

export interface IValidateSchema {
  name?: string;
  email: string;
  password: string;
}

export interface AuthRequest extends Request {
  user?: Record<string, any>;
}
