import { createSlice } from "@reduxjs/toolkit";

const globalSetting = createSlice({
    name: "globalSetting",
    initialState: {
        globalSettings: null,
        loading: false,
        error: null,

        subdomain: "",
        country: {
            name: "",
            code: ""    
    },
},
    reducers: {
        handleglobalSettingsStart: (state) => {
            state.loading = true
        },
        handleglobalSettingsSuccess: (state, action) => {
            state.loading = false   
            state.globalSettings = action.payload

        },
    } 
}); 
export const {
    handleglobalSettingsStart,
    handleglobalSettingsSuccess
} = globalSetting.actions
export default globalSetting.reducer