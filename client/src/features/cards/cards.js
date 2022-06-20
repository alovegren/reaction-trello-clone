import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

const createCard = createAsyncThunk(
  "cards/createCard",
  async ({ newCardInput, callback}) => {
    const { cardTitle, listId } = newCardInput;
    const data = await apiClient.createCard({ listId, card: { title: cardTitle } });

    if (callback) callback();
    return data;
  }
)

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (_, action) => {
      return action.payload.lists.flatMap(list => list.cards)
    });

    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload);
    })
  },
});

export default cardsSlice.reducer;
