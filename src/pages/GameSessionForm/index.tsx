import React, { useCallback, useState } from "react";

import { createGameSession } from "../../store";
import { useAppDispatch } from "../../hooks/storeHooks";
import { Button } from "../../components";
import { useNavigate } from "react-router-dom";

const GameSessionForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [hostname, setHostname] = useState("");
  const [players, setPlayers] = useState(0);
  const [map, setMap] = useState("");
  const [mode, setMode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createGameSession({ hostname, players, map, mode }));
    setHostname("");
    setPlayers(0);
    setMap("");
    setMode("");
  };
  const goBack = useCallback(() => {
    navigate("/");
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div>
        <label className="block text-sm font-medium">Hostname</label>
        <input
          type="text"
          value={hostname}
          onChange={(e) => setHostname(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Players</label>
        <input
          type="number"
          value={players}
          onChange={(e) => setPlayers(Number(e.target.value))}
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Map</label>
        <input
          type="text"
          value={map}
          onChange={(e) => setMap(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Mode</label>
        <input
          type="text"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="mt-1 block w-full p-2 border rounded"
          required
        />
      </div>
      <Button title="Create Session" className="mr-4" type="submit" />
      <Button title="Cancel" variant="secondary" onClick={goBack} />
    </form>
  );
};

export default GameSessionForm;
