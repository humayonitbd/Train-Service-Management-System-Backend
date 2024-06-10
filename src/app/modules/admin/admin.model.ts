import { Schema, model } from 'mongoose';
import { TAdmin, TAdminName } from './admin.interface';

const adminNameSchema = new Schema<TAdminName>({
  firstName: {
    type: String,
    required: [true, 'First name is Required'],
    trim: true,
    maxlength: [20, 'First name can not be more then 20 charecters'],
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is Required'],
  },
});

const adminsSchema = new Schema<TAdmin>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: adminNameSchema,
      required: [true, 'Name is required'],
    },
    designation: { type: String, required: [true, 'Designation is required'] },
    gender: {
      type: String,
      required: [true, 'Gender is required'],
      enum: ['male', 'female', 'other'],
    },
    dateOfBirth: {
      type: String,
      required: [true, 'Date of birth is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: {
      type: String,
      unique: true,
      required: [true, 'Contact number is required'],
    },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    profileImage: { type: String },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'Managment Department is required'],
      ref: 'ManagmentDepartment',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const Admin = model<TAdmin>('Admin', adminsSchema);
