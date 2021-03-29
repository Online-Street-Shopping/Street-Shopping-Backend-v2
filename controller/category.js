const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const SubCategory = require("../model/SubCategory");
const Category = require("../model/Category");

Category.hasMany( SubCategory, { as: "SubCategory", foreignKey: "categoryId" });
SubCategory.belongsTo( Category, { as: "Category", foreignKey: "categoryId" });

exports.getAllCategory = async( req, res )=>{
    Category.findAll()
    .then(( categories )=>{
        return res.status( 200 ).json( categories );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.getAllCategoryWithSubCategory = async( req, res )=>{
    Category.findAll({
        include: [{
            model: SubCategory, as: "SubCategory"
        }]
    })
    .then(( category )=>{
        return res.status(200).json( category );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//exports.getAddressByUserId = async( req, res )=>{};

exports.getCategoryWithSubCategoryByCategoryId = async( req, res )=>{
    const categoryId = req.params.categoryId;
    
    Category.findOne({
        where: { categoryId },
        include: [
            {
                model: SubCategory, as: "SubCategory",
            }
        ]
    })
    .then(( category )=>{
        return res.status(200).json( category );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addCategory = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  categoryName } = req.body;
        const categoryId = generateUniqueId({
            length: 20
        });

        console.log(categoryId);

        Category.create({
            categoryId,
            categoryName
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

exports.updateCategory = async( req, res )=>{
    const categoryId = req.params.categoryId;
    const { categoryName } = req.body;

    Category.findOne({ where: { categoryId }})
    .then(( category )=>{
        if( category ){
            category.update({
                categoryName
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this categoryId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteCategory = async( req, res )=>{
    const categoryId = req.params.categoryId;

    Category.destroy({
        where: { categoryId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Category deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};