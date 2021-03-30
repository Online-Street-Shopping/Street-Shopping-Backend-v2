const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const Pincode = require("../model/Pincode");
const City = require("../model/City");

// City.hasMany( Pincode, { as: "Pincode", foreignKey: "cityId" });
// Pincode.belongsTo( City, { as: "City", foreignKey: "cityId" });

exports.getAllPincode = async( req, res )=>{
    Pincode.findAll()
    .then(( pincodes )=>{
        return res.status( 200 ).json( pincodes );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};



//exports.getAddressByUserId = async( req, res )=>{};

exports.getPincodeByPincodeId = async( req, res )=>{
    const pincodeId = req.params.pincodeId;
    
    Pincode.findOne({
        where: { pincodeId },
    })
    .then(( pincode )=>{
        return res.status(200).json( pincode );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addPincode = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  pincode, cityId } = req.body;
        const pincodeId = generateUniqueId({
            length: 20
        });

        console.log(pincodeId);

        Pincode.create({
            pincodeId,
            pincode,
            cityId
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

exports.updatePincode = async( req, res )=>{
    const pincodeId = req.params.pincodeId;
    const { pincode, cityId } = req.body;

    Pincode.findOne({ where: { pincodeId }})
    .then(( pincod )=>{
        if( pincod ){
            pincod.update({
                pincode,
                cityId
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this pincodeId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deletePincode = async( req, res )=>{
    const pincodeId = req.params.pincodeId;

    Pincode.destroy({
        where: { pincodeId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Pincode deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};