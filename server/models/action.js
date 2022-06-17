const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
  description: String,
  card_id: {
    type: Schema.Types.ObjectId,
    ref: "Card",
  },
}, { timestamps: true });

const Action = mongoose.model('Action', ActionSchema);

module.exports = Action;
/*
"actions": [
    {
      "_id": 49,
      "description": " added this card to My list",
      "createdAt": "2020-10-08T17:54:55.319Z",
      "updatedAt": "2020-10-08T17:54:55.319Z",
      "card_id": 9
    }
  ]
*/
