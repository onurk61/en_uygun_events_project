import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const tokenStr = "asd";

interface initialStateType {
  eventsList: any;
  eventsListLoading: boolean;
  errorMessage: any;
}

const initialState: initialStateType = {
  eventsList: [],
  eventsListLoading: false,
  errorMessage: "",
};

export const getEventsList = createAsyncThunk(
  "alert/eventsList",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${tokenStr}` },
      });
      if (response.status === 200) {
        return response.data;
      }
      return;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const eventsSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventsList.pending, (state, action) => {
        state.eventsListLoading = true;
      })
      .addCase(getEventsList.fulfilled, (state, action) => {
        state.eventsList = action.payload;
        state.eventsListLoading = false;
      })
      .addCase(getEventsList.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.eventsListLoading = false;
      });
  },
});

export default eventsSlice;
