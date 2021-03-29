const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const Pincode = require("../model/Pincode");
const City = require("../model/City");

City.hasMany( Pincode, { as: "Pincode", foreignKey: "cityId" });
Pincode.belongsTo( City, { as: "City", foreignKey: "cityId" });

exports.getAllCity = async( req, res )=>{
    City.findAll()
    .then(( cities )=>{
        return res.status( 200 ).json( cities );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.getAllCityWithPincode = async( req, res )=>{
    City.findAll({
        include: [{
            model: Pincode, as: "Pincode"
        }]
    })
    .then(( city )=>{
        return res.status(200).json( city );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//exports.getAddressByUserId = async( req, res )=>{};

exports.getCityWithPincodeByCityId = async( req, res )=>{
    const cityId = req.params.cityId;
    
    City.findOne({
        where: { cityId },
        include: [
            {
                model: Pincode, as: "Pincode",
            }
        ]
    })
    .then(( city )=>{
        return res.status(200).json( city );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addCity = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  stateId, cityName } = req.body;
        const cityId = generateUniqueId({
            length: 20
        });

        console.log(cityId);

        City.create({
            cityId,
            stateId,
            cityName
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

exports.updateCity = async( req, res )=>{
    const cityId = req.params.cityId;
    const { stateId, cityName } = req.body;

    City.findOne({ where: { cityId }})
    .then(( city )=>{
        if( city ){
            city.update({
                stateId,
                cityName
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this cityId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteCity = async( req, res )=>{
    const cityId = req.params.cityId;

    City.destroy({
        where: { cityId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "City deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};