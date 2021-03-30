const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const User = require("../model/User");
const Card = require("../model/Card");

// User.hasMany( Card, { as: "Card", foreignKey: "userId" });
// Card.belongsTo( User, { as: "User", foreignKey: "userId" });


exports.getAllCard = async( req, res )=>{
    Card.findAll()
    .then(( cards )=>{
        return res.status( 200 ).json( cards );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};



//exports.getAddressByUserId = async( req, res )=>{};

exports.getCardByCardId = async( req, res )=>{
    const cardId = req.params.cardId;
    
    Card.findOne({
        where: { cardId },
    })
    .then(( pincode )=>{
        return res.status(200).json( pincode );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addCard = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const { userId, cardNo, cardType, cvvNo, expiryDate, nameOnCard } = req.body;
        const cardId = generateUniqueId({
            length: 20
        });

        console.log(cardId);

        Card.create({
            cardId,
            userId,
            cardNo,
            cardType,
            cvvNo,
            expiryDate,
            nameOnCard
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

exports.updatecard = async( req, res )=>{
    const cardId = req.params.cardId;
    const { userId, cardNo, cardType, cvvNo, expiryDate, nameOnCard } = req.body;

    Card.findOne({ where: { cardId }})
    .then(( card )=>{
        if( card ){
            card.update({
                userId,
                cardNo,
                cardType,
                cvvNo,
                expiryDate,
                nameOnCard            
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this cardId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteCard = async( req, res )=>{
    const cardId = req.params.cardId;

    Card.destroy({
        where: { cardId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Card deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};