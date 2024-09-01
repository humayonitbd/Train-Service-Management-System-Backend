import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { WalletService } from './wallet.service';


const addWallet = catchAsync(async (req, res) => {
  const result = await WalletService.addWallet(req.body);

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
    message: 'Add Wallet successfully',
    data: result,
  });
});

const getAllWallet = catchAsync(async (req, res) => {
  const result = await WalletService.getAllWallet(req.query);

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
    message: 'Wallet All retrived successfully!',
    meta: result.meta,
    data: result.result,
  });
});

export const WalletControllers = {
  addWallet,
  getAllWallet,
};
