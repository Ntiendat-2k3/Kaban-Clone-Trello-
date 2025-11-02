import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "cardModal",
  initialState: { isOpen: false, currentCardId: null },
  reducers: {
    openCard: (s, a) => {
      s.isOpen = true;
      s.currentCardId = a.payload;
    },
    closeCard: (s) => {
      s.isOpen = false;
      s.currentCardId = null;
    },
  },
});
export const { openCard, closeCard } = slice.actions;
export default slice.reducer;
