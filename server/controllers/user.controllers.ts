import { NextFunction, Request, Response } from 'express';

import asyncHandler from '../middlewares/asyncHandler.middleware';
import User from '../models/User.model';
import ErrorHandler from '../utils/errorHandler';

/**
 * @SIGNUP
 * @route @POST http://localhost:5000/api/v1/user/register
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
      // secure: true,
      // sameSite: 'none',
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user,
      accessToken,
    });
  }
);

/**
 * @LOGIN
 * @route @POST http://localhost:5000/api/v1/user/login
 * @DESCRIPTION User login controller for logging in a user
 **/
export const loginUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(
        new ErrorHandler('Email and password does not match or exist.', 400)
      );
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
      return next(
        new ErrorHandler('Email and password does not match or exist.', 400)
      );
    }

    user.password = undefined;

    const accessToken = await user.createAccessToken();
    const refreshToken = await user.createRefreshToken();

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
    });

    res.status(200).json({
      success: true,
      message: 'Login Success',
      user,
      accessToken,
    });
  }
);

/**
 * @LOGOUT
 * @route @GET http://localhost:5000/api/v1/user/logout
 * @DESCRIPTION User logout controller for logging out a user
 **/
export const logoutUser = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.cookie('token', '', {
      sameSite: 'none',
      httpOnly: true,
      maxAge: 1,
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  }
);

/**
 * @VERIFY
 * @route @GET http://localhost:5000/api/v1/user/verify
 * @DESCRIPTION Verify the token from req headers
 **/
export const verifyUser = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    console.log(req.user);

    res.status(200).json({
      success: true,
      message: 'Verified successfully',
      user: req.user,
    });
  }
);
