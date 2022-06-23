import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createComment = createAsyncThunk(
  "comments/createComment",
  async ({commentInfo, callback}) => {
    const data = await apiClient.createComment(commentInfo);
    if (callback) callback()
    return data;
  }
)

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createComment.fulfilled, (state, action) => {
      return state.concat(action.payload)
    });

    builder.addCase(fetchBoard.fulfilled, (state, action) => {
      const newState = [];

      action.payload.lists.forEach(list => {
        list.cards.forEach(card => {
          newState.push(...card.comments)
        })
      });
      
      return newState;
    });
  }
});

export default commentsSlice.reducer;