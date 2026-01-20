import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./sidebarSlice.js";
import UserSlice from "./userSlice.js";


const store = configureStore({
    reducer:{
          sidebar: SidebarSlice,
           user: UserSlice,
        

    }
})
export default store;