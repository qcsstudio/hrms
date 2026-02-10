import { createSlice } from "@reduxjs/toolkit";

// Addingyourself page api response save in state   /employee-invites/complete'

const employeeInviteSlice = createSlice({
  name: "employeeInvite",
  initialState: {
    completeData: null, 
                                  // completeData ==>  {  "message": "Profile submitted. Approval pending.",
                                                      //   "employeeId": "698afc8e979620fd48b1cccb",
                                                      //   "status": "PENDING_APPROVAL"}
    loading: false,
    error: null
  },
  reducers: {
    completeInviteStart: (state) => {
      state.loading = true
    },
    completeInviteSuccess: (state, action) => {
      state.loading = false
      state.completeData = action.payload
    },
    completeInviteFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    clearInviteData: (state) => {
      state.completeData = null
    }
  }
});

export const {
  completeInviteStart,
  completeInviteSuccess,
  completeInviteFailure,
  clearInviteData
} = employeeInviteSlice.actions;

export default employeeInviteSlice.reducer;
