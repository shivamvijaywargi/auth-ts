import express, { NextFunction, Request, Response } from 'express';
import asyncHandler from '../middlewares/asyncHandler.middleware';

/**
 * @SIGNUP
 * @route http://localhost:5000/api/v1/user/register
 * @DESCRIPTION User signup controller for creating a user
 **/
export const registerUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Register user');
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
