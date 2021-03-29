const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const SubCategory = require("../model/SubCategory");
const Category = require("../model/Category");


exports.getAllSubCategory = async( req, res )=>{
    SubCategory.findAll()
    .then(( subCategories )=>{
        return res.status( 200 ).json( subCategories );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};



//exports.getAddressByUserId = async( req, res )=>{};

exports.getSubCategoryBySubCategoryId = async( req, res )=>{
    const subCategoryId = req.params.subCategoryId;
    
    SubCategory.findOne({
        where: { subCategoryId },
    })
    .then(( pincode )=>{
        return res.status(200).json( pincode );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addSubCategory = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  subCategoryName, categoryId } = req.body;
        const subCategoryId = generateUniqueId({
            length: 20
        });

        console.log(subCategoryId);

        SubCategory.create({
            subCategoryId,
            subCategoryName,
            categoryId
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

exports.updateSubCategory = async( req, res )=>{
    const subCategoryId = req.params.subCategoryId;
    const { subCategoryName, categoryId } = req.body;

    SubCategory.findOne({ where: { subCategoryId }})
    .then(( subCategory )=>{
        if( subCategory ){
            subCategory.update({
                subCategoryName,
                categoryId
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this subCategoryId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteSubCategory = async( req, res )=>{
    const subCategoryId = req.params.subCategoryId;

    SubCategory.destroy({
        where: { subCategoryId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Sub-Category deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};