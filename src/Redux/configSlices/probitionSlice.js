import { createSlice } from "@reduxjs/toolkit";

const probitionSlice = createSlice({
    name: "probition",
    initialState: {
        probitionid:null,
        policyname:null,
        description:null,
        probationDurationDays:null

    },
    reducers: {
               getprobitiondata:(state,action)=>{
                state.probitionid = action.payload._id
                state.policyname = action.payload.policyName
                state.description = action.payload.description
                state.probationDurationDays = action.payload.probationDurationDays
                
        }

    }
})
export const {getprobitiondata } = probitionSlice.actions
export default probitionSlice.reducer