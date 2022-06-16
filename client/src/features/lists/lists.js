import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";

const initialState = [];

const newList = createAsyncThunk(
  "lists/newList",
  async (listTitle, boardId) => {
    const data = await apiClient.newList({ boardId, list: { title }})
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
  },
});

export default listsSlice.reducer;
