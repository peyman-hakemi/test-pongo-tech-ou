import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { GameSession, GameSessionsState } from "../../types";
import { createSession, getSessions } from "../../api";

// Initial state definition
const initialState: GameSessionsState = {
  sessions: [],
  loading: false,
  error: null,
};

interface ErrorResponse {
  message: string;
}

// Async thunk to fetch game sessions
export const fetchGameSessions = createAsyncThunk<
  GameSession[],
  void,
  { rejectValue: string }
>("gameSessions/fetchGameSessions", async (_, { rejectWithValue }) => {
  try {
    const response = await getSessions();
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message || "Failed to fetch game sessions"
    );
  }
});

// Async thunk to create a new game session
export const createGameSession = createAsyncThunk<
  GameSession,
  Omit<GameSession, "id">,
  { rejectValue: string }
>("gameSessions/createGameSession", async (newSession, { rejectWithValue }) => {
  try {
    const response = await createSession(newSession);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    return rejectWithValue(
      axiosError.response?.data?.message || "Failed to create game session"
    );
  }
});

// Slice definition
const gameSessionsSlice = createSlice({
  name: "gameSessions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch game sessions cases
      .addCase(fetchGameSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchGameSessions.fulfilled,
        (state, action: PayloadAction<GameSession[]>) => {
          state.loading = false;
          state.sessions = action.payload;
        }
      )
      .addCase(fetchGameSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch game sessions";
      })

      // Create game session cases
      .addCase(createGameSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createGameSession.fulfilled,
        (state, action: PayloadAction<GameSession>) => {
          state.loading = false;
          state.sessions.push(action.payload);
        }
      )
      .addCase(createGameSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create game session";
      });
  },
});

// Export the reducer as default
export default gameSessionsSlice.reducer;
