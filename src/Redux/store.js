import { configureStore } from "@reduxjs/toolkit"
import SidebarSlice from "./sidebarSlice"
import UserSlice from "./userSlice"

const store = configureStore({
    reducer:{
          sidebar: SidebarSlice,
           user: UserSlice,
        

    }
})
export default store