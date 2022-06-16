const List = require('../models/list');
const Board = require('../models/board');
const HttpError = require("../models/httpError");

const addList = (boardId, listId) => {
  Board.findById(boardId)
    .then((board) => {
      Board.updateOne({ _id: boardId }, { lists: board.lists.concat(listId) })
    })
    .catch((err) => {
      next(new HttpError("Adding new list to board failed, please try again", 500))
    });
}

const createList = (req, res, next) => {
  List.create({"title": req.body.list.title, "boardId": req.body.boardId })
    .then((list) => {
      addList(list.boardId, list._id);
      List.find({ _id: list._id }, "-__v -cards").then(
        (list) => res.json(list)
      );
    })
    .catch((err) =>
      next(new HttpError("Creating list failed, please try again", 500))
    );
};

const updateList = async (req, res, next) => {
 List.findOneAndUpdate({_id: req.params.id}, req.body)
    .then((list) => {
      List.find({ _id: list._id }, "-__v -cards").then(
        (list) => res.json(list)
      );
    })
    .catch((err) => {
      console.log(err)
      next(new HttpError("Updating list failed, please try again", 500))
    }
  );
};

exports.createList = createList;
exports.updateList = updateList;