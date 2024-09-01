import httpStatus from 'http-status';
import config from '../../config';
import sendResponse from '../../utils/sendResponse';

import catchAsync from '../../utils/catchAsync';
import { StationService } from './station.service';

const createStation = catchAsync(async (req, res) => {
  const result = await StationService.createStation(req.body);

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
    message: 'Create Station successfully',
    data: result,
  });
});

const stationAllGet = catchAsync(async (req, res) => {
  const result = await StationService.getAllStation(req.query);

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
    message: 'Station All retrived successfully!',
    meta: result.meta,
    data: result.result,
  });
});
const updateStation = catchAsync(async (req, res) => {
  const result = await StationService.updateStation(
    req.params.id,
    req.body,
  );

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
    message: 'Station are Updated successfully!',
    data: result,
  });
});

export const StationControllers = {
  createStation,
  stationAllGet,
  updateStation,
};
