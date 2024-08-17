import React, { useCallback, useEffect } from "react";

import { useAppDispatch } from "../../hooks/storeHooks";
import { GameSession } from "../../types";
import { Button, SessionCard } from "../../components";
import { useNavigate } from "react-router-dom";

const GameSessionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { sessions, loading, error } = useAppSelector(
  //   (state) => state.gameSession
  // );
  const loading = false;
  const sessions: GameSession[] = [
    {
      id: "1",
      hostname: "peyman",
      players: 2,
      map: "map",
      mode: "easy",
    },
    {
      id: "2",
      hostname: "sara",
      players: 3,
      map: "map",
      mode: "hard",
    },
  ];

  useEffect(() => {
    // dispatch(fetchGameSessions());
  }, [dispatch]);

  const goToNewSession = useCallback(() => {
    navigate("/create");
  }, []);

  if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {!!error}</p>;

  return (
    <div className="p-8">
      <Button title="Create a New Session" onClick={goToNewSession} />
      <ul className="space-y-4 mt-4">
        {!!sessions &&
          sessions.map((session) => (
            <SessionCard
              key={session.id}
              hostname={session.hostname}
              players={session.players}
              map={session.map}
              mode={session.mode}
            />
          ))}
      </ul>
    </div>
  );
};

export default GameSessionList;
