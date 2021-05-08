const generateUniqueId = require("generate-unique-id");

const Shop = require("../model/Shop");
const Product = require("../model/Product");
const User = require("../model/User");
const Market = require("../model/Market");
const Address = require("../model/Address");
const SubCategory = require("../model/SubCategory");
const Category = require("../model/Category");
const Media = require("../model/Media");

Shop.hasMany( Product, { as: "Product", foreignKey: "shopId" });
Product.belongsTo( Shop, { as: "Shop", foreignKey: "shopId" });

User.hasOne( Shop, { as: "Shop", foreignKey: "userId" });
Shop.belongsTo( User, { as: "Vendor", foreignKey: "userId" });

Market.hasMany( Shop, { as: "Shop", foreignKey: "marketId" });
Shop.belongsTo( Market, { as: "Market", foreignKey: "marketId" });

Address.hasOne( Shop, { as: "Shop", foreignKey: "addressId" });
Shop.belongsTo( Address, { as: "Address", foreignKey: "addressId" });

SubCategory.hasMany( Shop, { as: "Shop", foreignKey: "subCategoryId" });
Shop.belongsTo( SubCategory, { as: "SubCategory", foreignKey: "subCategoryId" });

exports.getShops = async( req, res )=>{
    Shop.findAll({
        include: [
            {
                model: Product, as: "Product"
            },
            {
                model: User, as: "Vendor"
            },
            {
                model: Market, as: "Market"
            },
            {
                model: Address, as: "Address"
            },
            {
                model: SubCategory, as: "SubCategory"
            }
        ]
    })
    .then(( shops )=>{
        res.status(200).json( shops );
    })
    .catch(( error )=>{
        res.status(402).json( error );
    });
};

exports.getShopsWithProducts = async( req, res )=>{
    Shop.findAll({
        include: [{
            model: Product, as: "Product"
        }]
    })
    .then(( shops )=>{
        res.status(200).json( shops );
    })
    .catch(( error )=>{
        res.status(402).json( error );
    });
};

exports.getShopsFromMarketId = async( req, res )=>{
    const marketId = req.params.marketId;

    if( marketId ){
        Shop.findAll({ where: { marketId } })
        .then(( response )=>{
            return res.status( 200 ).json( response );
        })
        .catch(( error )=>{
            return res.status( 422 ).json( error );
        });
    }
};

exports.getShop = async( req, res )=>{
    const shopId = req.params.shopId;

    if( shopId ){
        Shop.findAll({
            where: { shopId }
        })
        .then(( shop )=>{
            res.status(200).json( shop );
        })
        .catch(( error )=>{
            res.status(402).json( error );
        });
    } else{
        res.status(402).json({
            error: "Please provide shop-id to get data..."
        });
    }
};

exports.getShopWithProduct = async( req, res )=>{
    const shopId = req.params.shopId;

    if( shopId ){
        Shop.findAll({
            where: { shopId },
            include: [
                {
                    model: Product, as: "Product",
                    include:[{
                        model: SubCategory, as: "SubCategory",
                        include: [{
                            model: Category, as: "Category"
                        }],
                    },{
                        model: Media, as: "Media"
                    }]
                },
                {
                    model: Address, as: "Address"
                },
                {
                    model: User, as: "Vendor"
                },
                {
                    model: SubCategory, as: "SubCategory"
                },
                {
                    model: Market, as: "Market"
                }
            ]
        })
        .then(( shops )=>{
            res.status(200).json( shops );
        })
        .catch(( error )=>{
            res.status(402).json( error );
        });
    } else{
        res.status(402).json({
            error: "Please provide shop-id to get data..."
        });
    }
};

exports.addShop = async( req, res )=>{
    const { userId, shopKepperName, shopName, video, images, marketId, addressId, shopRating, subCategoryId } = req.body;

    const shopId = generateUniqueId({
        length: 20
    });

    Shop.create({
        shopId,
        userId,
        shopKepperName,
        shopName,
        video,
        images,
        marketId,
        addressId,
        shopRating,
        subCategoryId
    })
    .then(( response )=>{
        res.status(200).json( response );
    })
    .catch(( error )=>{
        res.status(402).json( error );
    });
};

exports.updateShop = async( req, res )=>{
    const shopId = req.params.shopId;
    const { shopKepperName, shopName, video, images, marketId, addressId, shopRating, subCategoryId } = req.body;


    Shop.findOne({
        where: { shopId }
    }).then(( shop )=>{
        shop.update({
            shopKepperName,
            shopName,
            video,
            images,
            marketId,
            addressId,
            shopRating,
            subCategoryId
        })
        .then(( response )=>{
            res.status(200).json( response );
        })
        .catch(( error )=>{
            res.status(402).json( error );
        });
    })
};

exports.deleteShop = async( req, res )=>{
    const shopId = req.params.shopId;
    if( shopId ){
        Shop.destroy({
            where: { shopId }
        })
        .then(( response )=>{
            res.status(200).json({
                message: "Shop deleted succecfuly !!"
            });
        })
        .catch(( error )=>{
            res.status(402).json({
                error: "Problem while deleting shop, "+error
            });
        });
    } else{
        res.status(402).json({
            error: "Please provide shop-id  to delete shop..."
        });
    }
};


