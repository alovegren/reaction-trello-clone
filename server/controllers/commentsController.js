const Comment = require('../models/comment');
const HttpError = require("../models/httpError");
const Card = require('../models/card')
const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({"text": req.body.comment.text, "cardId": req.body.cardId })
    req.context = {}
    req.context.comment = {
      _id: comment._id,
      text: comment.text,
      cardId: comment.cardId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    }
    next();
  } catch (err) {
    next(new HttpError("Creating comment failed, please try again", 500))
  }
}

const addCommentToCard = async (req, res, next) => {
  try {
    const card = await Card.findById(req.context.comment.cardId)
    console.log(card)
    await Card.findOneAndUpdate({ _id: req.context.comment.cardId }, 
      {"comments": card.comments.concat(req.context.comment._id), "commentsCount": card.commentsCount + 1})
    next();
  } catch (err) {
    next(new HttpError("Adding new comment to card failed, please try again", 500))
  }
}

const sendComment = async (req, res, next) => {
  try {
    res.json(req.context.comment)
  } catch (err) {
    next(new HttpError("Sending comment to card failed, please try again", 500))
  }
}

exports.createComment = createComment;
exports.sendComment = sendComment;
exports.addCommentToCard = addCommentToCard;