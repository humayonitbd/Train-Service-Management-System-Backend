/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
// import { User } from '../user/user.model';
import { Admin } from './admin.model';
import { adminsSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';

const createAdminService = async (payload: TAdmin) => {
  // console.log(payload);
  const result = await Admin.create(payload);
  return result;
};

const getAllAdminService = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(adminsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;
  return result;
};

const getSingleAdminService = async (id: string) => {
  const result = await Admin.findById(id);

  return result;
};

const deleteSingleAdminService = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // console.log("id", id);

    const deletedAdmin = await Admin.findByIdAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted Admin');
    }
    //user _id from deletefaculty
    // const userId = deletedAdmin.user;
    //     const deletedUser = await User.findByIdAndUpdate(
    //       { userId },
    //       { isDeleted: true },
    //       { new: true, session },
    //     );

    //     if (!deletedUser) {
    //       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to deleted Admin');
    //     }

    await session.commitTransaction();
    await session.endSession();

    return deletedAdmin;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(error.message);
  }
};

const updateSingleAdminService = async (
  id: string,
  payload: Partial<TAdmin>,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // console.log(modifiedUpdatedData);

  const result = await Admin.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AdminServices = {
  createAdminService,
  getAllAdminService,
  getSingleAdminService,
  deleteSingleAdminService,
  updateSingleAdminService,
};
