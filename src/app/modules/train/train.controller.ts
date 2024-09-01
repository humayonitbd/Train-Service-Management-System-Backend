import httpStatus from 'http-status';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

import catchAsync from '../../utils/catchAsync';
import { TrainService } from './train.service';


const createTrain = catchAsync(async (req, res) => {
  const result = await TrainService.createTrain(req.body);

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
    message: 'Create Train successfully',
    data: result,
  });
});

const TrainAllGet = catchAsync(async (req, res) => {
  const result = await TrainService.getAllTrain(req.query);

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
    message: 'Train All retrived successfully!',
    meta: result.meta,
    data: result.result,
  });
});
const updateTrain = catchAsync(async (req, res) => {
  const result = await TrainService.updateTrain(req.params.id, req.body);

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
    message: 'Train are Updated successfully!',
    data: result,
  });
});

export const TrainControllers = {
  createTrain,
  TrainAllGet,
  updateTrain,
};
