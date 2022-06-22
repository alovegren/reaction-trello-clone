const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  dueDate: Date,
  labels: [{ type: String }],
  description: String,
  listId: {
    type: Schema.Types.ObjectId,
    ref: "List",
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  position: Number,
  commentsCount: { type: Number, default: 0 },
  actions: [{
    type: Schema.Types.ObjectId,
    ref: "Action",
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment",
  }],
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;