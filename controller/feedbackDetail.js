const generateUniqueId = require("generate-unique-id");
const { validationResult } = require("express-validator");

const FeedbackDetail = require("../model/FeedbackDetail");
const Feedback = require("../model/Feedback");




exports.addFeedbackDetail = async( req, res )=>{
    const validationErrors = validationResult( req );

    if( validationErrors.isEmpty() ){

        // console.log(req.body);
        const {  feedbackId, question, answer } = req.body;
        const feedbackDetailsId = generateUniqueId({
            length: 20
        });

        console.log(feedbackDetailsId);

        FeedbackDetail.create({
            feedbackDetailsId,
            feedbackId,
            question,
            answer
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

exports.updateFeedbackDetail = async( req, res )=>{
    const feedbackDetailsId = req.params.feedbackDetailsId;
    const { feedbackId, question, answer } = req.body;

    FeedbackDetail.findOne({ where: { feedbackDetailsId }})
    .then(( feedbackDetails )=>{
        if( feedbackDetails ){
            feedbackDetails.update({
                feedbackId,
                question,
                answer
            })
            .then(( response )=>{
                return res.status(200).json(response);
            })
            .catch(( error )=>{
                return res.status(402).json(error);
            });
        } else{
            return res.status(404).json({
                error: "No data found with this feedbackDetailId !!"
            });
        }
    })
    .catch((error)=>{
        return res.status(402).json(error);
    });
};

exports.deleteFeedbackDetail = async( req, res )=>{
    const feedbackDetailsId = req.params.feedbackDetailsId;

    FeedbackDetail.destroy({
        where: { feedbackDetailsId }
    })
    .then(( response )=>{
        if( response ){
            return res.status(200).json({
                success: "Feedback details deleted succesfuly !!"
            });
        }
    })
    .catch(( error )=>{
        return res.status(402).json(error);
    });
};