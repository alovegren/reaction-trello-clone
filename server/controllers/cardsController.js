const Card = require('../models/card');
const List = require('../models/list');
const Action = require('../models/action');
const HttpError = require("../models/httpError");

const getCard = async (req, res, next) => {
  const card = await Card.findById(req.params.id, "-__v").populate('actions')
  if (!card) {
    return next(new HttpError("No card found with this ID", 404))
  } else {
    res.json(card);
  }
}

const createCard = async (req, res, next) => {
  const card = await Card.create({
    "title": req.body.card.title,
    "listId": req.body.listId
    });
    
  const list = await List.findById(card.listId);

  req.context = {};
  req.context.card = card;
  req.context.list = list;

  next();
}

const createAction = async (req, res, next) => {
  const action = await Action.create({
    description: `added this card to ${req.context.list.title}`,
    card_id: req.context.card._id,
  });

  req.context.actionId = action._id;
  next();
}

const addAction = async (req, res, next) => {
  await Card.findOneAndUpdate(
    { _id: req.context.card._id },
    { $push: { actions: req.context.actionId } },
    { new: true }
  );

  next();
}

const addCard = async (req, res, next) => {
  await List.findOneAndUpdate(
    { _id: req.context.list._id },
    { $push: { cards: req.context.card._id } },
    { new: true }
  )

  next();
}

const sendCard = async (req, res, next) => {
  res.json(req.context.card);
}

const updateCard = async (req, res, next) => {
  // await Card.findOneAndUpdate({ _id: req.params.id })
}

exports.getCard = getCard;
exports.createCard = createCard;
exports.createAction = createAction;
exports.addAction = addAction;
exports.addCard = addCard;
exports.sendCard = sendCard;