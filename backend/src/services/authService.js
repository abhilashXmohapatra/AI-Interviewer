import User from '../models/userModel.js';
import ApiError from '../utils/ApiError.js';

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = user.generateAccessToken();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = user.generateAccessToken();

  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User profile not found');
  }
  return user;
};
