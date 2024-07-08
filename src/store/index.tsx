import { configureStore } from "@reduxjs/toolkit";
import eventsSlice from "../features/EventsSlice";
const store = configureStore({
  reducer: {
    events: eventsSlice.reducer,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
