const Comment = require('../models/comment');
const HttpError = require("../models/httpError");

const createComment = async (req, res, next) => {
  try {
    const comment = await Comment.create({"text": req.body.comment.text, "cardId": req.body.cardId })
    res.json({
      _id: comment._id,
      text: comment.text,
      cardId: comment.cardId,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    })

  } catch (err) {
    next(new HttpError("Creating comment failed, please try again", 500))
  }
}

exports.createComment = createComment;