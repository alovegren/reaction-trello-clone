import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createCard = createAsyncThunk(
  "cards/createCard",
  async ({ newCardInput, callback}) => {
    const { cardTitle, listId } = newCardInput;
    const data = await apiClient.createCard({ listId, card: { title: cardTitle } });

    if (callback) {
      callback();
    }

    return data;
  }
)

export const updateCard = createAsyncThunk(
  "cards/updateCard",
  async (newCardInput) => {
    const { cardInfo, cardId, callback } = newCardInput;
    const data = await apiClient.updateCard(cardInfo, cardId);

    // if (callback) {
    //   callback();
    // }

    return data;
  }
)

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBoard.fulfilled, (_, action) => {
      return action.payload.lists.flatMap(list => {
        return list.cards.map(card => {
          const {comments, actions, ...cardWithoutCommentsOrActions} = card;
          return cardWithoutCommentsOrActions;
        })
      })
    });

    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });

    builder.addCase(updateCard.fulfilled, (state, action) => {
      console.log(action);
      return state.map(card => {
        if (card._id === action.payload._id) {
          return action.payload
        } else {
          return card
        }
      })
    })
  },
});

export default cardsSlice.reducer;
