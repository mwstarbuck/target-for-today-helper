import './App.css';
import GamePage from './Game/GamePage';
import { GameContextProvider } from './Game/GameContext';

function App() {
  return (
    <GameContextProvider>
      <div className="App">
        <GamePage />
      </div>
    </GameContextProvider>
  );
}

export default App;
