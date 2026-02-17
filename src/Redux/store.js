import { configureStore } from "@reduxjs/toolkit";
import SidebarSlice from "./sidebarSlice.js";
import UserSlice from "./userSlice.js";
import otpReducer from './otpSlice.js'
import employeeInviteReducer from './employeeInviteSlice.js'
import incorporationslice from './configSlices/incorporationslice.js'


const store = configureStore({
    reducer: {
        sidebar: SidebarSlice,
        user: UserSlice,
        otp: otpReducer,
        employeeInvite: employeeInviteReducer,      //adding yourself response
        incorporation: incorporationslice


    }
})
export default store;

