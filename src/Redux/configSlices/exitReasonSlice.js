import { createSlice } from "@reduxjs/toolkit";

const exitReasonSlice = createSlice({
  name: "exitReason",
  initialState: {
   
  },
  reducers: {
    setExitReasons: (state, action) => {
      state.exitReasons = action.payload;
    },
  },
});

export const { setExitReasons } = exitReasonSlice.actions;
export default exitReasonSlice.reducer;