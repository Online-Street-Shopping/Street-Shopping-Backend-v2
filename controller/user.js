const User = require("../model/User");
const Address = require("../model/Address");
const Card = require("../model/Card");

// Here, I haven't mention the relationship for Address as I have already did that in "address"
// controller, so repetation leads to ambiguty and errors

// -> If we mention this relationship in card controller also, then we dont have to mebtione here !!

// User.hasMany( Address, { as: "Address", foreignKey: "userId" });
// Address.belongsTo( User, { as: "User", foreignKey: "userId" });

User.hasMany( Card, { as: "Card", foreignKey: "userId" });
Card.belongsTo( User, { as: "User", foreignKey: "userId" });

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
    })
    ;
};