// src/store/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPopUp: false,
  otpCorrect: false,
  otpError: false,

  openEmailPopUp: false,
  emailOtpCorrect: false,
  emailOtpError: false,
  emailChange: { email: "", change: false },
  passwordDataCorrect: false,

  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  avatar: null,
  editMode: false,
  showText: "",
  text: "",

  // Navbar & sidebar
  openMenu: true,
  uiLoading: true,
  activeUrl: "home",

  // Settings
  showSettingsMenu: false,

  //logout
  logout:false
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenPopUp: (state, action) => { state.openPopUp = action.payload; },
    setOtpCorrect: (state, action) => { state.otpCorrect = action.payload; },
    setOtpError: (state, action) => { state.otpError = action.payload; },

    setEmailOpenPopUp: (state, action) => { state.openEmailPopUp = action.payload; },
    setEmailOtpCorrect: (state, action) => { state.emailOtpCorrect = action.payload; },
    setEmailOtpError: (state, action) => { state.emailOtpError = action.payload; },
    setEmailChange: (state, action) => { state.emailChange = action.payload; },
    setPasswordDataCorrect: (state, action) => { state.passwordDataCorrect = action.payload; },

    setFirstName: (state, action) => { state.firstName = action.payload; },
    setLastName: (state, action) => { state.lastName = action.payload; },
    setEmail: (state, action) => { state.email = action.payload; },
    setPhone: (state, action) => { state.phone = action.payload; },
    setAvatar: (state, action) => { state.avatar = action.payload; },
    setEditMode: (state, action) => { state.editMode = action.payload; },
    setShowText: (state, action) => { state.showText = action.payload; },
    setText: (state, action) => { state.text = action.payload; },

    setOpenMenu: (state, action) => { state.openMenu = action.payload; },
    setUiLoading: (state, action) => { state.uiLoading = action.payload; },
    setActiveUrl: (state, action) => { state.activeUrl = action.payload; },

    setShowSettingsMenu: (state, action) => { state.showSettingsMenu = action.payload; },

    // Extra: toggleMenu (same as your setMenu function)
    toggleMenu: (state) => {
      const updatedMenu = !state.openMenu;
      state.openMenu = updatedMenu;
      localStorage.setItem("openMenu", updatedMenu);
    },

    // Initialize from localStorage (your useEffect logic)
    initializeMenuFromStorage: (state) => {
      const storageVal = localStorage.getItem("openMenu");
      if (storageVal != null) {
        state.openMenu = storageVal === "true";
      } else {
        localStorage.setItem("openMenu", true);
        state.openMenu = true;
      }
      state.uiLoading = false;
    },
setLogout:(state)=>{

}

  },
});

export const {
  setOpenPopUp, setOtpCorrect, setOtpError,
  setEmailOpenPopUp, setEmailOtpCorrect, setEmailOtpError,
  setEmailChange, setPasswordDataCorrect,
  setFirstName, setLastName, setEmail, setPhone, setAvatar, setEditMode,
  setShowText, setText,
  setOpenMenu, setUiLoading, setActiveUrl,
  setShowSettingsMenu,
  toggleMenu, initializeMenuFromStorage
} = uiSlice.actions;

export default uiSlice.reducer;
