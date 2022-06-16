import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";

const initialState = [];

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (_, action) => {
      return action.payload.lists.flatMap(list => list.cards)
    });
  },
});

export default cardsSlice.reducer;
