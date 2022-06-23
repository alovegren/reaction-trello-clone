import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import cardsReducer from "../features/cards/cards";
import listsReducer from "../features/lists/lists";
import commentsReducer from '../features/comments/comments';
import actionsReducer from '../features/actions/actions';

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    cards: cardsReducer,
    lists: listsReducer,
    comments: commentsReducer,
    actions: actionsReducer,
  },
});

export default store;
