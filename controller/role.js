const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const Role = require("../model/Role");




exports.addRole = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  roleName } = req.body;
        const roleId = generateUniqueId({
            length: 20
        });

        console.log(roleId);

        Role.create({
            roleId,
            roleName
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

exports.updateRole = async( req, res )=>{
    const roleId = req.params.roleId;
    const { roleName } = req.body;

    Role.findOne({ where: { roleId }})
    .then(( roles )=>{
        if( roles ){
            roles.update({
                roleName
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this roleId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteRole = async( req, res )=>{
    const roleId = req.params.roleId;

    Role.destroy({
        where: { roleId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Role  deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};