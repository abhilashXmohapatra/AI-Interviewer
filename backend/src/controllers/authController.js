import asyncHandler from '../utils/asyncHandler.js';
import * as authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  res.status(201).json({
    success: true,
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    data: result,
  });
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User profile retrieved successfully',
    data: { user },
  });
});
