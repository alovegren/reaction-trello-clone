import { createSlice } from "@reduxjs/toolkit";
import { createCard } from "./cards";

const initialState = {
  globalListWrapperClass: 'list-wrapper',
  globalDropDownClass: 'add-dropdown add-bottom'
};

export const resetDropdown = () => {
  return { type: 'resetDropdown'}
}

const cardToggleSlice = createSlice({
  name: "cardToggle",
  initialState,
  reducers: {
    resetDropdown: () => {
      console.log('here!')
      return {
        globalListWrapperClass: 'list-wrapper',
        globalDropDownClass: 'add-dropdown add-bottom'
      };
    }
  },
  extraReducers: (builder) => {
    builder.addCase(createCard.fulfilled, () => {
      return {
        globalListWrapperClass: 'list-wrapper',
        globalDropDownClass: 'add-dropdown add-bottom'
      };
    });
  },
});

export default cardToggleSlice.reducer;


