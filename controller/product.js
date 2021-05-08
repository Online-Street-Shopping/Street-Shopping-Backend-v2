const Product = require("../model/Product");
const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");
const Media = require("../model/Media");
const SubCategory = require("../model/SubCategory");
const Shop = require("../model/Shop");

Product.hasMany( Media, { as: "Media", foreignKey: "productId" });
Media.belongsTo( Product, { as: "Product", foreignKey: "productId" });

SubCategory.hasMany( Product, { as: "Product", foreignKey: "subCategoryId"});
Product.belongsTo( SubCategory, { as: "SubCategory", foreignKey: "subCategoryId"});

// get allproducts...
exports.getProducts = async( req, res )=>{
    Product.findAll()
    .then(( products )=>{
        res.status( 200 ).json( products );
    })
    .catch(( error )=>{
        res.status( 402 ).json( error );
    });
};

exports.getProductWithShopsSubCategory = async( req, res )=>{
    Product.findAll({
        include: [
            {
                model: Shop, as: "Shop",
            },
            {
                model: Media, as: "Media"
            },
            {
                model: SubCategory, as: "SubCategory"
            }
        ]
    })
    .then(( products )=>{
        res.status( 200 ).json( products );
    })
    .catch(( error )=>{
        res.status( 402 ).json( error );
    });
};

// getting single product by id
exports.getProduct = async( req, res )=>{
    const productId = req.params.productId;

    if( productId ){
        Product.findOne({
            where: {
                productId
            }
        })
        .then(( products )=>{
            res.status( 200 ).json( products );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide a product id to get a product..."
        });
    }
};

// getting products by shop/shopId...
exports.getProductByShop = async( req, res )=>{
    const shopId = req.params.shopId;

    if( shopId ){
        Product.findAll({
            where: {
                shopId
            },
            include: [
                {
                    model: Shop, as: "Shop",
                },
                {
                    model: Media, as: "Media"
                },
                {
                    model: SubCategory, as: "SubCategory"
                }
            ]
        })
        .then(( products )=>{
            res.status( 200 ).json( products );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide a shop id to get a product..."
        });
    }
};

// getting products by category/subcategory-Id...
exports.getProductByCategory = async( req, res )=>{
    const subCategoryId = req.params.subCategoryId;

    if( subCategoryId ){
        Product.findAll({
            where: {
                subCategoryId
            }
        })
        .then(( products )=>{
            res.status( 200 ).json( products );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide a Sub-categorty id to get a product..."
        });
    }
};

exports.addProduct = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const { shopId, productName, description, price, stock, subCategoryId } = req.body;
        const productId = generateUniqueId({
            length: 20
        });

        Product.create({
            productId,
            shopId,
            productName,
            description,
            price,
            stock,
            subCategoryId
        })
        .then(( response )=>{
            res.status(200).json( response );
        })
        .catch(( error )=>{
            res.status(402).json( error );
        });
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.updateProduct = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){
        const { shopId, productName, description, price, stock, subCategoryId } = req.body;
        const productId = req.params.productId;
        if( productId ){
            Product.findOne({
                where: {
                    productId
                }
            })
            .then(( product )=>{
                product.update({
                    shopId,
                    productName,
                    description,
                    price,
                    stock,
                    subCategoryId
                })
                .then(( response )=>{
                    res.status( 200 ).json( response );
                })
                .catch(( error )=>{
                    res.status( 402 ).json( error );
                });
            })
            .catch(( error )=>{
                res.status( 402 ).json( error );
            });
        } else{
            res.status( 402 ).json({
                error: "Please provide a product id to get a product..."
            });
        }
    } else{
        return res.status(422).json({
            error: validationErrors.array()[0].msg
        });
    }
};

exports.deleteProduct = async( req, res )=>{
    const productId = req.params.productId;

    if( productId ){
        Product.destroy({
            where: {
                productId
            }
        })
        .then(( products )=>{
            res.status( 200 ).json( products );
        })
        .catch(( error )=>{
            res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide a product id to delete a product..."
        });
    }
};

exports.getProductById = async( req, res, productId, next )=>{
    if( productId ){
        await Product.findOne({
            where: {
                productId
            }
        })
        .then(( product )=>{
            // req.product = product;
            // return JSON.stringify( product );
            res.status( 200 ).json( product );
        })
        .catch(( error )=>{
            console.log(error);
            // res.status( 402 ).json( error );
        });
    } else{
        res.status( 402 ).json({
            error: "Please provide a product id to get a product..."
        });
    }
    next();
};

// module.exports = getProductById;