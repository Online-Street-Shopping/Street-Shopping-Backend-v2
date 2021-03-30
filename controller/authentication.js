const { validationResult } = require("express-validator");
const generateUniqueId = require("generate-unique-id");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const Address = require("../model/Address");
const Card = require("../model/Card");

exports.signIn = async( req, res )=>{
    const validationErrors = validationResult( req );
    console.log("From signin");
    if( validationErrors.isEmpty() ){
        const { emailId, password } = req.body;
        console.log("From signin -- passing errors");
        User.findOne({
            where: { emailId },
            include: [
                {
                    model: Address, as: "Address",
                },
                {
                    model: Card, as: "Card"
                }
            ]
        })
        .then(( response )=>{
            if( response != null ){
                console.log( response );
                bcrypt.compare( password, response.password, ( error, result )=>{
                    if( result === true ){
                        const token = jwt.sign({ id: response.userId }, process.env.JWT_SECRET);
                        console.log("Token: ",token);
                        
                        res.cookie( "token", token, { expire: new Date() + 5 });
                        res.cookie( "user", response, { expire: new Date() + 5 });
                        
                        res.status(200).json({
                            token: token,
                            message: "Sign-in succesfuly !!"
                        });
                    } else{
                        res.status(422).json({
                            message: "email or password does not match... "
                        });
                    }
                });
            } else{
                res.status(422).json({
                    message: "invalid email-id or password... "
                });
            }
        })
        .catch(( error )=>{
            res.status(422).json(error);
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.signUp = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const { firstName, lastName, emailId, password, contactNo } = req.body;

        console.log(req.body);

        const userId = generateUniqueId({
            length: 20
        });

        console.log(process.env.SALT_ROUNDS);

        bcrypt.hash( password, parseInt( process.env.SALT_ROUNDS ), ( error, hash )=>{
            if( error ){
                console.log("Error while encrypting the password::", error );
            } else{
                // password = hash;

                User.create({
                    userId,
                    firstName,
                    lastName,
                    emailId,
                    password: hash,
                    contactNo
                })
                .then(( response )=>{
                    return res.status(200).json( response );
                })
                .catch(( error )=>{
                    return res.status(200).json({ error });
                });
            }
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }

};

exports.signOut = async( req, res )=>{
    console.log(req.cookies);
    console.log(req.cookies);

    console.log(req.cookies.token);
    console.log(req.cookies.user);

    try{
        res.clearCookie("token");
        res.clearCookie("user");

        console.log(res.token);
        console.log(res.user);

        res.status(200).json({
            message: "signout succesfuly !!"
        });
    } catch( error ){
        res.status(402).json({
            message: "signout failed !!"
        });
    }
};

const isSignedInM = ()=>{
    if( req.cookies.token ){
        console.log(req.cookies.user);
        console.log("signined");
        return true;
    }
    return false;
};

const isUserM = ()=>{
    if( isSignedInM() ){
        const user = req.cookies.user;
        if( user.userRole === USER ){
            return true;
        } else{
            return false;
        }
    }
    return false;
};

const isAdminM = ()=>{
    if( isSignedInM() ){
        const user = req.cookies.user;
        if( user.userRole === ADMIN ){
            return true;
        } else{
            return false;
        }
    }
    return false;
};

const isVendorM = ()=>{
    if( isSignedInM() ){
        const user = req.cookies.user;
        if( user.userRole === VENDOR ){
            return true;
        } else{
            return false;
        }
    }
    return false;
};

const isDeliveryBoyM = ()=>{
    if( isSignedInM() ){
        const user = req.cookies.user;
        if( user.userRole === DELIVERY_BOY ){
            return true;
        } else{
            return false;
        }
    }
    return false;
};

exports.isSignedIn = ( req, res, next )=>{
    if( !isSignedInM() ){
        console.log(req.cookies.user);
        console.log("signined");
        return res.status(403).json({
            error: "You haven't signed in..."
        });
    }

    next();
};

exports.isAdmin = ( req, res, next )=>{
    if( !isAdminM() ){
        return res.status(403).json({
            error: "You are not a Admin, Access Denied..."
        });
    }

    next();
};

exports.isVendor = ( req, res, next )=>{
    if( isVendorM() ){
        return res.status(403).json({
            error: "You are not a Vendor, Access Denied..."
        });
    }

    next();
};

exports.isDeliveryBoy = ( req, res, next )=>{
    if( isDeliveryBoyM() ){
        return res.status(403).json({
            error: "You are not a Delivery Boy, Access Denied..."
        });
    }

    next();
};

exports.isUser = ( req, res, next )=>{
    if( isUserM() ){
        return res.status(403).json({
            error: "You are not a User, Access Denied..."
        });
    }
    next();
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