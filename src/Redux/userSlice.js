import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // login data
    user: null,
    token: null,
    loginSpinner: false,

    // company data
    companyId: null,


}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddLoginData: (state, action) => {
      state.loginSpinner = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    setCompanyData: (state, action) => {
      state.companyId = action.payload.companyId;
      console.log("companyId in redux store",state.companyId)
    },
  },
});


export const {
    setAddLoginData, setCompanyData,
} = userSlice.actions;

export default userSlice.reducer;