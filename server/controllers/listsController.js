const List = require('../models/list')
const HttpError = require("../models/httpError");

const createList = (req, res, next) => {
  List.create({"title": req.body.list.title, "boardId": req.body.boardId })
    .then((list) => {
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