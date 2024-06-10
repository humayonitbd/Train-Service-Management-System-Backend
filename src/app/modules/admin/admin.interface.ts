import { Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TAdminName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: TAdminName;
  designation: string;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
  managementDepartment: Types.ObjectId;
  isDeleted?: boolean;
};
