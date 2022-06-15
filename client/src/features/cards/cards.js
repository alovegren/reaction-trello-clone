import { createSlice } from "@reduxjs/toolkit";
import { getBoard } from "../boards/board";

const initialState = [];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (_, action) => {
      return action.payload.lists.flatMap(list => list.cards)
    });
  },
});

export default cardsSlice.reducer;
