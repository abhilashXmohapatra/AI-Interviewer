import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    throw new ApiError(401, 'Unauthorized request. No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, 'Invalid access token. User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(401, 'Invalid or expired token');
  }
});