const express = require("express");
const { check } = require("express-validator");
const { 
    getUserDetailsById, 
    deleteUser, 
    updateUser, 
    updatePassword, 
    updateProfilePicture, 
    getAllUsers, 
    getAllAdmins, 
    getAllVendors, 
    getAllDeliveryBoys
} = require("../controller/user");
const routes = express.Router();

routes.get(
    "/user/details/:userId",
    getUserDetailsById
);

// Get-users by email-id
routes.get(
    "/user/details/:emailID",
    getUserDetailsByEmail
);

// get-All-Users
routes.get(
    "/user/users/",
    getAllUsers
);

// get-ALl-Admins
routes.get(
    "/user/admins/",
    getAllAdmins
);

// get-all-Vendors
routes.get(
    "/user/vendors/",
    getAllVendors
);

// get-all-Delivery-Boy
routes.get(
    "/user/delivery-boys/",
    getAllDeliveryBoys
);

routes.put(
    "/user/:userId",
    [
        check("firstName").isLength({ min: 3, max: 50 }).withMessage("firstname must be greater than 3 !!"),
        check("lastName").isLength({ min: 3, max: 50 }).withMessage("lastname must be greater than 3 !!"),
        check("contactNo").isLength({ min: 10, max: 10 }).withMessage("contact no length should excat 10."),
    ],
    updateUser
);

routes.put(
    "/user/update-password/:userId",
    [
        check("password").isLength({ min: 8, max: 20 }).withMessage("password length should be between 8 to 20."),
    ],
    updatePassword
);

routes.put(
    "/user/profile-image/:userId",
    [
        check("profileImage").isLength({ min: 6, max: 50 }).withMessage("profile-image can't be empty !!"),
    ],
    updateProfilePicture
);

routes.delete(
    "/user/:userId",
    deleteUser
);

module.exports = routes;