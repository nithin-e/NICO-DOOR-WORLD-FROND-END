import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axiosInstance from "../cors/axiousInstence";
import { AxiosError } from "axios";


export const adminLogin = createAsyncThunk(
    'admin/login', 
    async (adminData, { rejectWithValue }) => {
      try {
        console.log('hey deee moleeeee');
        
        const response = await axiosInstance.post('/admin/login', adminData);

        return response.data; 
      } catch (error) {
        console.log('heloooo');
        
        if (error instanceof AxiosError && error.response) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue({ message: "An unexpected error occurred" });
        }
      }
    }
  );