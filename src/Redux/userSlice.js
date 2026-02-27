import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  // login data
  user: null,
  token: null,
  loginSpinner: false,
  role: null,


  // company data
  companyId: null,
  istemporyPassword:null,

   forcePasswordChange: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddLoginData: (state, action) => {
      state.loginSpinner = false;
      // state.user = action.payload.user;
      // state.token = action.payload.token;
      // state.role = action.payload.role;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.companyId = action.payload.user.companyId;
      state.istemporyPassword = action.payload.user.istemporyPassword

       state.forcePasswordChange = action.payload.forcePasswordChange; 

    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.role = null;
      state.companyId = null;
      state.forcePasswordChange = false;
    },

    setCompanyData: (state, action) => {
      state.companyId = action.payload.companyId;
      console.log("companyId in redux store", state.companyId)
    },
  },
});


export const {
  setAddLoginData, logout, setCompanyData,
} = userSlice.actions;

export default userSlice.reducer;



