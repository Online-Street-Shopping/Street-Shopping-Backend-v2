const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const City = require("../model/City");
const State = require("../model/State");

State.hasMany( City, { as: "City", foreignKey: "stateId" });
City.belongsTo( State, { as: "State", foreignKey: "stateId" });

exports.getAllState = async( req, res )=>{
    State.findAll()
    .then(( states )=>{
        return res.status( 200 ).json( states );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.getAllStateWithCity = async( req, res )=>{
    State.findAll({
        include: [{
            model: City, as: "City"
        }]
    })
    .then(( state )=>{
        return res.status(200).json( state );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//exports.getAddressByUserId = async( req, res )=>{};

exports.getStateWithCityByStateId = async( req, res )=>{
    const stateId = req.params.stateId;
    
    State.findOne({
        where: { stateId },
        include: [
            {
                model: City, as: "City",
            }
        ]
    })
    .then(( state )=>{
        return res.status(200).json( state );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addState = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  stateName } = req.body;
        const stateId = generateUniqueId({
            length: 20
        });

        console.log(stateId);

        State.create({
            stateId,
            stateName
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

exports.updateState = async( req, res )=>{
    const stateId = req.params.stateId;
    const { stateName } = req.body;

    State.findOne({ where: { stateId }})
    .then(( state )=>{
        if( state ){
            state.update({
                stateName
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this stateId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteState = async( req, res )=>{
    const stateId = req.params.stateId;

    State.destroy({
        where: { stateId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "State deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};