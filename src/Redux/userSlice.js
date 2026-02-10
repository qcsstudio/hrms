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
    
    logout: (state) => {
      state.token = null;
      state.user = null;
    },

    setCompanyData: (state, action) => {
      state.companyId = action.payload.companyId;
      console.log("companyId in redux store",state.companyId)
    },
  },
});


export const {
    setAddLoginData,logout , setCompanyData,
} = userSlice.actions;

export default userSlice.reducer;

 

 