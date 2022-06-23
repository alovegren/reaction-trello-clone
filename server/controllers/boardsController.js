const Board = require("../models/board");
const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");

const getBoards = async (req, res, next) => {
  const boards = await Board.find({}, "title _id createdAt updatedAt")
  res.json(boards);
};

const getBoard = async (req, res, next) => {
  const board = await Board.findOne({_id: req.params.id}, "-__v")
    .populate({ 
      path: 'lists', populate: {
        path: "cards", model: "Card", populate: {
          path: "comments", model: "Comment"
        } 
      }
    })
    .populate({ 
      path: 'lists', populate: {
        path: "cards", populate: {
          path: "actions", model: "Action"
        } 
      }
    });

  if (!board) {
    return next(new HttpError("No board found with this ID", 404))
  } else {
    res.json(board);
  }
}

const createBoard = async (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    try {
      const board = await Board.create(req.body.board)
      res.json({
        title: board.title,
        _id: board._id,
        createdAt: board.createdAt,
        updatedAt: board.updatedAt,
      });
    } catch (err) {
      next(new HttpError("Creating board failed, please try again", 500))
    }
  } else {
    return next(new HttpError("The input field is empty.", 404));
  }
};

exports.getBoard = getBoard;
exports.getBoards = getBoards;
exports.createBoard = createBoard;
