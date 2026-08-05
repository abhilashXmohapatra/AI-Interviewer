import ApiError from '../utils/ApiError.js';


export const notFoundHandler = (req, res, next) => {
  const error = new ApiError(404, `Resource Not Found - ${req.originalUrl}`);
  next(error);
};


export const errorMiddleware = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';
    error = new ApiError(statusCode, message, [], err.stack);
  }

  const response = {
    success: false,
    statusCode: error.statusCode,
    message: error.message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(error.statusCode).json(response);
};

export default errorMiddleware;
