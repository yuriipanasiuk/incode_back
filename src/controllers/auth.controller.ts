import { Response, Request, NextFunction } from "express";
import httpError from "http-errors";
import bscrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { User } from "../model/user";
import { IUser, CustomRequest } from "../types/userTypes";

config();

const ACCESS_SECRET_KEY: string = process.env.ACCESS_SECRET_KEY as string;
const REFRESH_SECRET_KEY: string = process.env.REFRESH_SECRET_KEY as string;

const singUp = async (req: Request, res: Response, next: NextFunction) => {
  const { fullName, userName, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ userName });
    const hashPassword = await bscrypt.hash(password, 10);
    if (user) {
      return next(httpError(409, "User name in use"));
    }

    await User.create({
      fullName,
      userName,
      password: hashPassword,
    });

    res.status(201).json({
      user: {
        fullName,
        userName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const { userName, password } = req.body;

  try {
    const user: IUser | null = await User.findOne({ userName });

    if (!user) {
      return next(httpError(401, "User name or password is wrong"));
    }

    const passwordCompare = await bscrypt.compare(password, user.password);

    if (!passwordCompare) {
      return next(httpError(401, "User name  or password is wrong"));
    }

    const payload = {
      id: user._id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "3h",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7h",
    });

    await User.findByIdAndUpdate(user._id, { accessToken, refreshToken });

    res.json({
      accessToken,
      refreshToken,
      user: {
        userName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id } = req.user || {};

  try {
    await User.findByIdAndUpdate(_id, {
      accessToken: null,
      refreshToken: null,
    });

    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

const getCurrent = (req: CustomRequest, res: Response, _next: NextFunction) => {
  const { fullName, userName } = req.user || {};

  res.json({
    user: {
      fullName,
      userName,
    },
  });
};

const refresh = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, REFRESH_SECRET_KEY) as { id: string };
    const isExist = await User.findOne({ refreshToken: token });

    if (!isExist) {
      next(httpError(403, "Token invalid"));
    }

    const payload = {
      id,
    };

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "3h",
    });

    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "7h",
    });

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(httpError(403, error.message));
    }
  }
};

export { singUp, loginUser, logOut, getCurrent, refresh };
