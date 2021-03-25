const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const Address = require("../model/Address");
const User = require("../model/User");

User.hasMany( Address, { as: "Address", foreignKey: "userId" });
Address.belongsTo( User, { as: "User", foreignKey: "userId" });

exports.getAllAddress = async( req, res )=>{
    Address.findAll()
    .then(( addresses )=>{
        return res.status( 200 ).json( addresses );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.getAllAddressWithUser = async( req, res )=>{
    Address.findAll({
        include: [{
            model: User, as: "User"
        }]
    })
    .then(( address )=>{
        return res.status(200).json( address );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

exports.getAddressByUserId = async( req, res )=>{};

exports.getAddressWithUserByUserId = async( req, res )=>{};

exports.addAddress = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const { userId, line1, line2, line3, pincodeId, addressType, } = req.body;
        const addressId = generateUniqueId({
            length: 20
        });

        console.log(addressId);

        Address.create({
            addressId,
            userId,
            line1,
            line2,
            line3,
            pincodeId,
            addressType
        })
        .then(( response )=>{
            return res.status(200).json(response);
        })
        .catch(( error )=>{
            return res.status(402).json(error);
        });
    } else {
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.updateAddress = async( req, res )=>{
    const addressId = req.params.addressId;
    const { userId, line1, line2, line3, pincodeId, addressType, } = req.body;

    Address.findOne({ where: { addressId }})
    .then(( address )=>{
        if( address ){
            address.update({
                userId,
                line1,
                line2,
                line3,
                pincodeId,
                addressType
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this addressId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteAddress = async( req, res )=>{
    const addressId = req.params.addressId;

    Address.destroy({
        where: { addressId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Address deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};