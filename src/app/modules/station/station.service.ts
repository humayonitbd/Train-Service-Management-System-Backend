import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { TStation } from './station.interface';
import { Station } from './station.model';


const createStation = async (payload: TStation) => {
  const isExistCategoryByName = await Station.findOne({ name: payload.name });
  if (isExistCategoryByName) {
    throw new Error('Already Station is Exist!!');
  }
  const result = await Station.create(payload);
  return result;
};

const getAllStation = async (query: Record<string, unknown>) => {
  const StationQuery = new QueryBuilder(
    Station.find({ isDeleted: false }),
    query,
  )
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await StationQuery.modelQuery;
  const meta = await StationQuery.countTotal();
  return { meta, result };
};

// const getSingleProductServic = async (payload: string) => {
//   const existingBookingById = await Product.findById(payload);

//   if (!existingBookingById) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Product is not found!!');
//   }
//   const result = await Product.findById(payload);
//   return result;
// };

const updateStation = async (
  id: string,
  payload: Partial<any>,
) => {
  const existingStationById = await Station.findById(id);

  if (!existingStationById) {
    throw new AppError(httpStatus.NOT_FOUND, 'Station is not found!!');
  }

  if (existingStationById.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'Station is not found!!');
  }
  const result = await Station.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StationService = {
  createStation,
  getAllStation,
  updateStation,
};
