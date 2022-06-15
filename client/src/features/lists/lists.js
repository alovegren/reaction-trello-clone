import { createSlice } from "@reduxjs/toolkit";
import { getBoard } from "../boards/board";

const initialState = [];

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (_, action) => {
      return action.payload.lists.map(list => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });
    });
  },
});

export default listsSlice.reducer;
