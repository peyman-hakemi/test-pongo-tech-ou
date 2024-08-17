export interface GameSession {
  id: string;
  hostname: string;
  players: number;
  map: string;
  mode: string;
}

export interface GameSessionsState {
  sessions: GameSession[];
  loading: boolean;
  error: string | null;
}
