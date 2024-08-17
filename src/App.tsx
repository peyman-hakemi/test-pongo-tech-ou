import { Route, Routes } from "react-router-dom";
import { GameSessionForm, GameSessionList } from "./pages";

function App() {
  return (
    <div className="max-w-4xl mx-auto p-8 ">
      <h1 className="text-4xl font-bold mb-8">Game Session Manager</h1>
      <Routes>
        <Route path="/" element={<GameSessionList />} />
        <Route path="/create" element={<GameSessionForm />} />
      </Routes>
    </div>
  );
}

export default App;
