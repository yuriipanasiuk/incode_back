import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import httpError from "http-errors";
import {User} from '../model/user';
import { AuthRequest } from '../types/userTypes';

const ACCESS_SECRET_KEY: string = process.env.ACCESS_SECRET_KEY as string;

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const { authorization = '' } = req.headers;
      const [type, token] = authorization.split(' ');
  
      if (type !== 'Bearer') {
        return next(httpError(401, 'Not autorized'));
      }
  
      const { id } = jwt.verify(token, ACCESS_SECRET_KEY) as { id: number };
      const user = await User.findOne({_id: id});
  
      if (!user || !user.accessToken) {
        return next(httpError(401, 'Not autorized'));
      }
  
      req.user = user;

      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message === 'invalid signature') {
          return res.status(401).json({ error: 'Not autorized' });
        }
      }
      next(error);
    }
  };