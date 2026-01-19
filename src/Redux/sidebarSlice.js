// src/store/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  // Navbar & sidebar
  openMenu: true,
  uiLoading: true,
  activeUrl: "home",

  // Settings
  showSettingsMenu: false,


};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
  

    setOpenMenu: (state, action) => { state.openMenu = action.payload; },
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
  setOpenMenu,setActiveUrl,
  setShowSettingsMenu,
  toggleMenu, initializeMenuFromStorage
} = uiSlice.actions;

export default uiSlice.reducer;
