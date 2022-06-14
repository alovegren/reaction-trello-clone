const Board = require("../models/board");
const List = require('../models/list')
const Card = require('../models/card')
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = (req, res, next) => {
  Board.find({}, "title _id createdAt updatedAt").
  then((boards) => {
    res.json({
      boards,
    });
  });
};

const getBoard = (req, res, next) => {
  Board.findById(req.params.id, "-__v").populate("lists").populate({
    path: 'lists',
    populate: {
      path: 'cards',
      model: 'Card'
    }
  }).then((board) => {
    if (!board) {
      return next(new HttpError("No board found with this ID", 404))
    } else {
      res.json(board);
    }
  })
}

const createBoard = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    Board.create(req.body.board)
      .then((board) => {
        Board.find({ _id: board._id }, "title _id createdAt updatedAt").then(
          (board) => res.json({ board })
        );
      })
      .catch((err) =>
        next(new HttpError("Creating board failed, please try again", 500))
      );
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoard = getBoard;
exports.getBoards = getBoards;
exports.createBoard = createBoard;
