interface IProps {
  hostname: string;
  players: number;
  map: string;
  mode: string;
}

function SessionCard({ hostname, players, map, mode }: IProps) {
  return (
    <li className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-600 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <h3 className="text-xl font-extrabold text-white mb-2">{hostname}</h3>
      <p className="text-gray-300 mb-1">Players: {players}</p>
      <p className="text-gray-300 mb-1">Map: {map}</p>
      <p className="text-gray-300">Mode: {mode}</p>
    </li>
  );
}

export default SessionCard;
