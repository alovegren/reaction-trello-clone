import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import cardsReducer from "../features/cards/cards";
import listsReducer from "../features/lists/lists";
import commentsReducer from '../features/comments/comments'

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
    lists: listsReducer,
    comments: commentsReducer,
  },
});

export default store;
