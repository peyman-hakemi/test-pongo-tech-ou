import { configureStore } from "@reduxjs/toolkit";
import gameSessionReducer from "./slices/gameSessionSlice";

export const store = configureStore({
  reducer: {
    gameSession: gameSessionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
