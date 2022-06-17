const Card = require('../models/card');
const List = require('../models/list');
const Action = require('../models/action');
const HttpError = require("../models/httpError");

const getListName = (listId) => {
  return List.findById(listId)
    .then((list) => list.title);
}

const addActionToCard = (actionId, cardId) => {
  Card.findById(cardId)
    .then((card) => {
      console.log(actionId)
      Card.findOneAndUpdate(
        { _id: cardId },
        { "actions": card.actions.concat(actionId) }
      )
      .then(card => console.log(card))
    })
    .catch((err) => {
      next(new HttpError("Adding new action to card failed, please try again", 500))
    });
}

const getCard = (req, res, next) => {
  Card.findById(req.params.id, "-__v")
    .populate('actions')
    .then((card) => {
      if (!card) {
        return next(new HttpError("No card found with this ID", 404))
      } else {
        res.json(card);
      }
  });
}

const createCard = (req, res, next) => {
  let listName;

  Card.create({
    "title": req.body.card.title,
    "listId": req.body.listId
    })
    .then((card) => {
      getListName(req.body.listId)
        .then(listTitle => { listName = listTitle });

      Action.create({
        description: `added this card to ${listName}`,
        card_id: card._id
      }).then(action => {
        addActionToCard(action._id, card._id);
      });

      Card.find({ _id: card._id }, "-__v").then(
        (card) => res.json(card)
      );
    });
}

exports.getCard = getCard;
exports.createCard = createCard;