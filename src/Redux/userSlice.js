import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loginSpinner: false,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAddLoginData: (state, action) => {
            state.loginSpinner = false;
            state.user = action.payload.user;
            // state.token = action.payload.token;

            console.log("Login Data Added to Redux:", state.user);
        }
    }
})


export const {
    setAddLoginData,
} = userSlice.actions;

export default userSlice.reducer;