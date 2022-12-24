import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../middlewares/asyncHandler.middleware';
import User from '../models/User.model';
import ErrorHandler from '../utils/errorHandler';

/**
 * @SIGNUP
 * @route http://localhost:5000/api/v1/user/register
 * @DESCRIPTION User signup controller for creating a user
 **/
export const registerUser = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
    });

    user.password = undefined;

    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    });

    res.status(201).json({
      success: true,
      user,
      accessToken,
    });
  }
);

export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Login user');
  }
);

export const logoutUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Logout user');
  }
);
