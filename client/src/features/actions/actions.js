import { createSlice } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";

const initialState = [];

const actionsSlice = createSlice({
  name: "actions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const newState = [];

      action.payload.lists.forEach(list => {
        list.cards.forEach(card => {
          newState.push(...card.actions);
        });
      });
      
      return newState;
    });
  }
});

export default actionsSlice.reducer;