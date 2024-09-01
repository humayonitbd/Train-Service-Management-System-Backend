import httpStatus from 'http-status';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import catchAsync from '../../utils/catchAsync';




const signupUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signupService(req.body);

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
  const { refreshToken, accessToken } = result;

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
    },
  });
});

export const AuthControllers = {
  signupUser,
  loginUser,

};
