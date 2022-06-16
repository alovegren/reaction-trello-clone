import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

export const fetchBoard = createAsyncThunk(
  "boards/fetchBoard",
  async (boardId) => {
    const data = await apiClient.getBoard(boardId);
    return data;
  }
)

export const createBoard = createAsyncThunk(
  "boards/createBoard",
  async (newBoard, callback) => {
    const data = await apiClient.createBoard(newBoard);
    if (callback) {
      callback;
    }
    return data;
  }
);

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoards.fulfilled, (_, action) => {
      return action.payload;
    });

    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      //eslint-disable-next-line
      const { lists, ...boardWithoutLists } = action.payload;
      
      const boardsWithoutBoard = state.filter(board => {
        return board._id !== action.payload._id;
      });

      return boardsWithoutBoard.concat(boardWithoutLists);
    });

    builder.addCase(createBoard.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  },
});

export default boardSlice.reducer;
