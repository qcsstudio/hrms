import { configureStore } from "@reduxjs/toolkit"
import SidebarSlice from "./sidebarSlice"

const store = configureStore({
    reducer:{
          sidebar: SidebarSlice,
        

    }
})
export default store