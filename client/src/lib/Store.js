import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import boardReducer from "../features/boards/board";
import cardsReducer from "../features/cards/cards";
import listsReducer from "../features/lists/lists";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    board: boardReducer,
    cards: cardsReducer,
    lists: listsReducer,
  },
});

export default store;
