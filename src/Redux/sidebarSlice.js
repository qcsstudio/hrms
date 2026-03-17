import { createSlice } from "@reduxjs/toolkit";

const getStoredBoolean = (key, fallbackValue) => {
  if (typeof window === "undefined") return fallbackValue;

  const storageValue = localStorage.getItem(key);
  if (storageValue == null) return fallbackValue;
  return storageValue === "true";
};

const initialState = {
  openMenu: getStoredBoolean("openMenu", true),
  uiLoading: true,
  activeUrl: "home",
  showSettingsMenu: false,
  isConfig: getStoredBoolean("sidebarModeIsConfig", false),
};

const SidebarSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setOpenMenu: (state, action) => {
      state.openMenu = action.payload;
      localStorage.setItem("openMenu", action.payload);
    },
    setActiveUrl: (state, action) => {
      state.activeUrl = action.payload;
    },
    setShowSettingsMenu: (state, action) => {
      state.showSettingsMenu = action.payload;
    },
    setIsConfig: (state, action) => {
      state.isConfig = action.payload;
      localStorage.setItem("sidebarModeIsConfig", action.payload);

      if (action.payload === true) {
        state.openMenu = true;
        localStorage.setItem("openMenu", true);
      }
    },
    toggleMenu: (state) => {
      if (state.isConfig) {
        state.openMenu = true;
        localStorage.setItem("openMenu", true);
        return;
      }

      const updatedMenu = !state.openMenu;
      state.openMenu = updatedMenu;
      localStorage.setItem("openMenu", updatedMenu);
    },
    initializeMenuFromStorage: (state) => {
      state.openMenu = getStoredBoolean("openMenu", true);
      state.isConfig = getStoredBoolean("sidebarModeIsConfig", false);
      state.uiLoading = false;
    },
    setLogout: () => {},
  },
});

export const {
  setOpenMenu,
  setActiveUrl,
  setShowSettingsMenu,
  toggleMenu,
  initializeMenuFromStorage,
  setIsConfig,
} = SidebarSlice.actions;

export default SidebarSlice.reducer;
