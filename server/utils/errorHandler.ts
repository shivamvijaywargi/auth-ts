class ErrorHandler extends Error {
  status: string;
  isOperational: Boolean;
  constructor(message: string, public statusCode: number) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'Internal Error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
