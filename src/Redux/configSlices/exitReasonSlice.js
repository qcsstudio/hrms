import { createSlice } from "@reduxjs/toolkit";

const exitReasonSlice = createSlice({
  name: "exitReason",
  initialState: {
    id: null,
    isActive: null,
   
  },
  reducers: {
    setExitReasons: (state, action) => {
      state.id = action.payload._id;
      state.isActive = action.payload.isActive;
    },
  },
});

export const { setExitReasons } = exitReasonSlice.actions;
export default exitReasonSlice.reducer;