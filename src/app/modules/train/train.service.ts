import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { AppError } from '../../error/AppError';
import { Train } from './train.model';
import { TTrain } from './train.interface';


const createTrain = async (payload: TTrain) => {
  const isExistCategoryByName = await Train.findOne({ name: payload.name });
  if (isExistCategoryByName) {
    throw new Error('Already Train is Exist!!');
  }
  const result = await Train.create(payload);
  return result;
};

const getAllTrain = async (query: Record<string, unknown>) => {
  const TrainQuery = new QueryBuilder(Train.find({ isDeleted: false }), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await TrainQuery.modelQuery;
  const meta = await TrainQuery.countTotal();
  return { meta, result };
};


const updateTrain = async (id: string, payload: Partial<any>) => {
  const existingTrainById = await Train.findById(id);

  if (!existingTrainById) {
    throw new AppError(httpStatus.NOT_FOUND, 'Station is not found!!');
  }

  if (existingTrainById.isDeleted === true) {
    throw new AppError(httpStatus.NOT_FOUND, 'Station is not found!!');
  }
  const result = await Train.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const TrainService = {
  createTrain,
  getAllTrain,
  updateTrain,
};
