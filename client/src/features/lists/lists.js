import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";
const initialState = [];

export const createList = createAsyncThunk(
  "lists/createList",
  async ({ listTitle, boardId }) => {
    const data = await apiClient.createList({ boardId, list: { "title": listTitle }})
    return data;
  }
)

export const updateList = createAsyncThunk(
  "lists/updateList",
  async({ updateInfo, listId }) => {
    const data = await apiClient.updateList(updateInfo, listId)
    return data;
  }
)

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (_, action) => {
      return action.payload.lists.map(list => {
        //eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;
        return listWithoutCards;
      });
    });
    builder.addCase(createList.fulfilled, (state, action) => {
      return state.concat(action.payload)
    });
    builder.addCase(updateList.fulfilled, (state, action) => {
      return state.map(list => {
        if (list._id === action.payload._id) {
          return action.payload
        } else {
          return list
        }
      })
    })
  },
});

export default listsSlice.reducer;
