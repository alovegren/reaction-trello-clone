const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The Card title is required']
  },
  dueDate: String,
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
  commentsCount: Number
})

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

/*

{
  "_id": 1,
  "title": "Web dev",
  "createdAt": "2020-10-04T05:57:02.777Z",
  "updatedAt": "2020-10-04T05:57:02.777Z",
  "lists": [
    {
      "_id": 3,
      "title": "CSS",
      "boardId": 1,
      "createdAt": "2020-10-04T06:53:39.302Z",
      "updatedAt": "2020-10-04T06:53:39.302Z",
      "position": 65535.0,
      "cards": [
        {
          "_id": 7,
          "title": "1",
          "dueDate": null,
          "labels": [
            "red",
            "purple"
          ],
          "description": "Selectors",
          "listId": 3,
          "boardId": 1,
          "position": 65535.0,
          "commentsCount": 0
        }
      ]
    }
  ]
}

*/