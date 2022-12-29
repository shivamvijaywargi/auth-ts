import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandler';
import asyncHandler from './asyncHandler.middleware';

declare module 'express' {
  export interface Request {
    user?: string | JwtPayload;
  }
}

export const protect = asyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    let token: string;

    if (
      req.headers &&
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer ')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else {
      return next(
        new ErrorHandler('You are not Authorized, please login', 401)
      );
    }

    if (!token) {
      return next(
        new ErrorHandler('You are not Authorized, please login', 401)
      );
    }

    const decoded = await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    );

    if (decoded) {
      req.user = decoded;
    }

    next();
  }
);
