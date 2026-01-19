import { createAsyncThunk } from "@reduxjs/toolkit";
import createAxios from "../axios.config";

const axiosInstance = createAxios();



export const loginAPI = createAsyncThunk(
  "user/loginAPI",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/auth/superadmin/login", formData);
      return res.data; 
    } catch (e) {
      return rejectWithValue(e.response?.data || { message: "Login failed" });
    }
  }
);