const User = require("../model/User");
const Address = require("../model/Address");
const Card = require("../model/Card");

const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const DELIVERY_BOY = 1;
const USER = 2;
const VENDOR = 3;
const ADMIN = 4;
// Here, I haven't mention the relationship for Address as I have already did that in "address"
// controller, so repetation leads to ambiguty and errors

// -> If we mention this relationship in card controller also, then we dont have to mebtione here !!

// User.hasMany( Address, { as: "Address", foreignKey: "userId" });
// Address.belongsTo( User, { as: "User", foreignKey: "userId" });

User.hasMany( Card, { as: "Card", foreignKey: "userId" });
Card.belongsTo( User, { as: "User", foreignKey: "userId" });

// get-user-by-Id
exports.getUserDetailsById = async( req, res )=>{
    const userId = req.params.userId;

    User.findOne({
        where: { userId },
        include: [
            {
                model: Address, as: "Address",
            },
            {
                model: Card, as: "Card"
            }
        ]
    })
    .then(( userDetails )=>{
        return res.status( 200 ).json( userDetails );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

// Get user by Email-Id
// SALT_ROUNDS=9
// JWT_SECRET=AAKASH_IS_BEST

exports.getUserByEmailId = async( req, res )=>{
    const emailId = req.params.emailID;

    User.findOne({
        where: { emailId }
    })
    .then(( userDetails )=>{
        return res.status( 200 ).json( userDetails );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

// Updating user info like firstName, lastName, contactNo
exports.updateUser = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const { firstName, lastName, contactNo } = req.body;

        const userId = req.params.userId;
        User.findOne({ where: { userId } })
        .then(( user )=>{
            if( user ){
                user.update({
                    firstName,
                    lastName,
                    contactNo
                })
                .then(( response )=>{
                    return res.status(200).json( response );
                })
                .catch(( error )=>{
                    return res.status(404).json({
                        error: "Error while updating data !!"
                    });
                });
            } else{
                return res.status(404).json({
                    error: "No data found with this userId !!"
                });
            }
        })
        .catch(( error )=>{
            return res.status(404).json({
                error: "No data found with this userId !!"
            });
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
    
};

// Delete the user -- soft-delete
exports.deleteUser = async( req, res )=>{
    const userId = req.params.userId;
    console.log(userId);
    if( userId ){
        User.findOne({
            where: { userId }
        })
        .then(( user )=>{
            if( user ){
                const newUserRole = -user.userRole;
                console.log( newUserRole );
                user.update({
                    userRole: newUserRole
                })
                .then(( response )=>{
                    return res.status(200).json( response );
                })
                .catch(( error )=>{
                    return res.status(402).json( error );
                });
            }
        })
        .catch(( error )=>{
            return res.status(404).json({
                error: "Invalid userid !!" + error
            });
        });
    } else{
        return res.status(404).json({
            error: "User-id is missing !!"
        });
    }
};

// Update/forgot password
exports.updatePassword = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const userId = req.params.userId;
        console.log(userId);

        const { password } = req.body;

        if( userId ){
            User.findOne({
                where: { userId }
            })
            .then(( user )=>{
                if( user ){
                    bcrypt.hash( password, parseInt( process.env.SALT_ROUNDS), ( error, hash )=>{
                        if( error ){
                            console.log("Bcrypt :: ", error );
                        } else{
                            user.update({
                                password: hash
                            })
                            .then(( response )=>{
                                return res.status(200).json( response );
                            })
                            .catch(( error )=>{
                                return res.status(402).json( error );
                            });
                        }
                    });
                }
            })
            .catch(( error )=>{
                return res.status(404).json({
                    error: "Invalid userid !!" + error
                });
            });
        } else{
            return res.status(404).json({
                error: "User-id is missing !!"
            });
        }
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

// Update the profile picture...
exports.updateProfilePicture = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const userId = req.params.userId;
        console.log(userId);

        const { profileImage } = req.body;

        if( userId ){
            User.findOne({
                where: { userId }
            })
            .then(( user )=>{
                if( user ){
                    user.update({
                        profileImage
                    })
                    .then(( response )=>{
                        return res.status(200).json( response );
                    })
                    .catch(( error )=>{
                        return res.status(402).json( error );
                    });
                }
            })
            .catch(( error )=>{
                return res.status(404).json({
                    error: "Invalid userid !!" + error
                });
            });
        } else{
            return res.status(404).json({
                error: "User-id is missing !!"
            });
        }
    } else {
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

// get-ALl-Users
exports.getAllUsers = async( req, res )=>{
    User.findAll({
        where: { userRole: USER },
        include: [
            {
                model: Address, as: "Address",
            },
            {
                model: Card, as: "Card"
            }
        ]
    })
    .then(( users )=>{
        return res.status( 200 ).json( users );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

// get-All-Vendors
exports.getAllVendors = async( req, res )=>{
    User.findAll({
        where: { userRole: VENDOR },
        include: [
            {
                model: Address, as: "Address",
            },
            {
                model: Card, as: "Card"
            }
        ]
    })
    .then(( users )=>{
        return res.status( 200 ).json( users );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

// get-All-delivery-boys
exports.getAllDeliveryBoys = async( req, res )=>{
    User.findAll({
        where: { userRole: DELIVERY_BOY },
        include: [
            {
                model: Address, as: "Address",
            },
            {
                model: Card, as: "Card"
            }
        ]
    })
    .then(( users )=>{
        return res.status( 200 ).json( users );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

// get-All-admins
exports.getAllAdmins = async( req, res )=>{
    User.findAll({
        where: { userRole: ADMIN },
        include: [
            {
                model: Address, as: "Address",
            },
            {
                model: Card, as: "Card"
            }
        ]
    })
    .then(( users )=>{
        return res.status( 200 ).json( users );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

const getUserByAddress = ( addressId )=>{
    if( addressId ){
        User.findOne({
            where: { addressId },
            include: [
                {
                    model: Address, as: "Address",
                },
                {
                    model: Card, as: "Card"
                }
            ]
        })
        .then(( userDetails )=>{
            return userDetails;
        })
        .catch(( error )=>{
            return error;
        })
        ;
    } else{
        return null;
    }
};

/*
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
*/