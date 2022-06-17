const Card = require('../models/card');
const HttpError = require("../models/httpError");

const getCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        return next(new HttpError("No card found with this ID", 404))
      } else {
        res.json(card);
      }
  });
}

exports.getCard = getCard;