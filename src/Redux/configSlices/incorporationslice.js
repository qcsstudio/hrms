import { createSlice } from "@reduxjs/toolkit";

const incorporationslice = createSlice({
    name: "incorporation",
    initialState: {
        incorporationid: null,
        incorporationadminId: null,


    },
    reducers: {
        handleincorporation: (state, action) => {
            state.incorporationid = action.payload._id;
            state.incorporationadminId = action.payload.adminId;
        }
    }
});
export const {
    handleincorporation
} = incorporationslice.actions
export default incorporationslice.reducer