const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const FeedbackDetail = require("../model/FeedbackDetail");
const Feedback = require("../model/Feedback");

Feedback.hasMany( FeedbackDetail, { as: "FeedbackDetail", foreignKey: "feedbackId" });
FeedbackDetail.belongsTo( Feedback, { as: "Feedback", foreignKey: "feedbackId" });

exports.getAllFeedback = async( req, res )=>{
    Feedback.findAll()
    .then(( feedbacks )=>{
        return res.status( 200 ).json( feedbacks );
    })
    .catch(( error )=>{
        return res.status( 402 ).json( error );
    });
};

exports.getAllFeedbackWithFeedbackDetail = async( req, res )=>{
    Feedback.findAll({
        include: [{
            model: FeedbackDetail, as: "FeedbackDetail"
        }]
    })
    .then(( feedback )=>{
        return res.status(200).json( feedback );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })
};

//exports.getAddressByUserId = async( req, res )=>{};

exports.getFeedbackWithFeedbackDetailByFeedbackId = async( req, res )=>{
    const feedbackId = req.params.feedbackId;
    
    Feedback.findOne({
        where: { feedbackId },
        include: [
            {
                model: FeedbackDetail, as: "FeedbackDetail",
            }
        ]
    })
    .then(( feedback )=>{
        return res.status(200).json( feedback );
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    })

};

exports.addFeedback = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  feedbackTitle, feedbackDescription, addedBy, isForUser, isForVendor } = req.body;
        const feedbackId = generateUniqueId({
            length: 20
        });

        console.log(feedbackId);

        Feedback.create({
            feedbackId,
            feedbackTitle,
            feedbackDescription,
            addedBy,
            isForUser,
            isForVendor
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

exports.updateFeedback = async( req, res )=>{
    const feedbackId = req.params.feedbackId;
    const { feedbackTitle, feedbackDescription, addedBy, isForUser, isForVendor } = req.body;

    Feedback.findOne({ where: { feedbackId }})
    .then(( feedback )=>{
        if( feedback ){
            feedback.update({
                feedbackTitle,
                feedbackDescription,
                addedBy,
                isForUser,
                isForVendor
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this feedbackId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteFeedback = async( req, res )=>{
    const feedbackId = req.params.feedbackId;

    Feedback.destroy({
        where: { feedbackId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Feedback deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};