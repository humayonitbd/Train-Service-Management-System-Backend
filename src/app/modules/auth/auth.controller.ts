import httpStatus from 'http-status';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import { JwtPayload } from 'jsonwebtoken';



const signupUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signupService(req.file, req.body);

  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found!',
      data: [],
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User registered successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginService(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  
  if (!result) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found!',
      data: '',
    });
  }

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  await AuthServices.changePassword(req.user, passwordData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password change is successfully!',
    data: null,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  // console.log(refreshToken);
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Refresh token access successfully!',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const userId = req.body.id;
  const result = await AuthServices.forgatePassword(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Reset link is generated successfully!',
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPassword(req.body, token as string);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Password reset successfully!',
    data: result,
  });
});

export const AuthControllers = {
  signupUser,
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
