import { Request, Response, NextFunction } from 'express';

// Define a custom error interface
interface IError extends Error {
  statusCode?: number;
  message: string;
}

// General error handler middleware
const errorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
  // Set default error values
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  // Log the error (for development/debugging purposes)
  console.error(err);

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
