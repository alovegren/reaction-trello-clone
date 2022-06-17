const List = require('../models/list');
const Board = require('../models/board');
const HttpError = require("../models/httpError");

const addListToBoard = async (req, res, next) => {
  try {
    const board = await Board.findById(res.locals.list.boardId)
    await Board.findOneAndUpdate({ _id: res.locals.list.boardId }, {"lists": board.lists.concat(res.locals.list._id)})
    res.json(res.locals.list)
  } catch (err) {
    next(new HttpError("Adding new list to board failed, please try again", 500))
  }
}

const createList = async (req, res, next) => {
  try {
    const list = await List.create({"title": req.body.list.title, "boardId": req.body.boardId })
    res.locals.list = list
    next()
  } catch (err) {
    next(new HttpError("Creating list failed, please try again", 500))
  }
}

const updateList = async (req, res, next) => {
  try {
    const list = List.findOneAndUpdate({_id: req.params.id}, req.body)
    const shortenedList = List.find({ _id: list._id }, "-__v -cards")
  } catch(err) {
    next(new HttpError("Updating list failed, please try again", 500))
  }
};

exports.createList = createList;
exports.updateList = updateList;
exports.addListToBoard = addListToBoard