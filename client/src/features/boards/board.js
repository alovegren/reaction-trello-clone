import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = {};

export const getBoard = createAsyncThunk(
  "board/getBoard",
  async (boardId) => {
    const data = await apiClient.getBoard(boardId);
    return data;
  }
)

const currentBoardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBoard.fulfilled, (_, action) => {
      return action.payload
    })
  },
});

export default currentBoardSlice.reducer;
