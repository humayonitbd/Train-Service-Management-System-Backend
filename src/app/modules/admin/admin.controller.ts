import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';

const createAdmin = catchAsync(async (req, res) => {
  const { admin: adminData } = req.body;
  const result = await AdminServices.createAdminService(adminData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin are create successfully!',
    data: result,
  });
});
const getAllAdmin = catchAsync(async (req, res) => {
  // console.log(req.query)
  const result = await AdminServices.getAllAdminService(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin are retrieved successfully!',
    data: result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminService(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin are retrieved successfully!',
    data: result,
  });
});

const deleteSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteSingleAdminService(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin are deleted successfully!',
    data: result,
  });
});

const updateSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateSingleAdminService(id, admin);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin are updated successfully!',
    data: result,
  });
});

export const AdminControllers = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  deleteSingleAdmin,
  updateSingleAdmin,
};
