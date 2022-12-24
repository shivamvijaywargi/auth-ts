import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/errorHandler';

const devError = (err: any, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    errorStack: err.stack,
  });
};

const prodError = (err: any, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'Error',
      message: 'Something went wrong',
    });
  }
};

const handleValidationError = (error: any) => {
  let allErrors = Object.values(error.errors).map((e: any) => e.message);

  const message = `Invalid input: ${allErrors.join(' ')}`;

  return new ErrorHandler(message, 400);
};

const handleDuplicateFieldsError = (error: any) => {
  const message = `Duplicate ${Object.keys(error.keyValue)} field`;

  return new ErrorHandler(message, 400);
};

const errorMiddleware = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Error';

  if (process.env.NODE_ENV === 'development') {
    devError(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name;
    error.code = err.code;

    // Validation error
    if (error.name === 'ValidationError') {
      error = handleValidationError(error);
    }

    // Duplicate key error
    if (error.code === 11000) {
      error = handleDuplicateFieldsError(error);
    }

    // Wrong JWT Error
    if (error.name === 'JsonWebTokenError') {
      const message = `Json Web Token is invalid, try again`;

      return new ErrorHandler(message, 400);
    }

    // JWT expired Error
    if (error.name === 'TokenExpiredError') {
      const message = `Json Web Token is expired, try again`;

      return new ErrorHandler(message, 400);
    }

    // Wrong MongoDB ID error
    if (error.name === 'CastError') {
      const message = `Resource not found. Invalid ${error.path}`;

      return new ErrorHandler(message, 400);
    }

    prodError(error, res);
  }
};

export default errorMiddleware;
