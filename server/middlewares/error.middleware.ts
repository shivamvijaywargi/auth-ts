import { NextFunction, Request, Response } from 'express';

const errorMiddleware = async (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack,
  });
};

export default errorMiddleware;
