import { GameSession } from "../../types";
import createAxiosInstance from "../baseRequest";

// Create an Axios instance
const apiClient = createAxiosInstance();

// Fetch game sessions
export const getSessions = () => apiClient.get<GameSession[]>("/sessions");

// Fetch game sessions
export const createSession = (newSession: Omit<GameSession, "id">) =>
  apiClient.post<GameSession>("/sessions", newSession);
