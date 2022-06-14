const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,
    required: [true, 'The List title is required']
  },
  boardId: {
    type: Schema.Types.ObjectId,
    ref: "Board",
  },
  position: Number,
  cards: [{ type: Schema.Types.ObjectId, ref: 'Card' }]
}, { timestamps: true })

const List = mongoose.model('List', ListSchema);

module.exports = List;

/*
const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

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