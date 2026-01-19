import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./userSlice";
import SidebarSlice from "./sidebarSlice";

const store = configureStore({
    reducer:{
          sidebar: SidebarSlice,
           user: UserSlice,
        

    }
})
export default store;