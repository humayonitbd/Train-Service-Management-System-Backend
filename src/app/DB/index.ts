import config from "../config";
import { USER_ROLE } from "../modules/user/user.constant";
import { User } from "../modules/user/user.model";



const superUser = {
  name:'Md Humayon Forid',
  email: 'mdhumayonforid93@gmail.com',
  password: config.super_admin_password,
  needsPasswordChange: false,
  phone: "+1234567890",
  role: 'superAdmin',
  address: "123 Main Street, Springfield, USA",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
    // Check if there is already a super admin user
    const isSuperAdminExists = await User.findOne({
      role: USER_ROLE.superAdmin,
    });

    if (!isSuperAdminExists) {
      // Create super admin user if not exists
      await User.create(superUser);
      
    } 

};

export default seedSuperAdmin;
