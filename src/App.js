import './App.css';
import "antd/dist/antd.css";
import GamePage from './Game/GamePage';
import { GameContextProvider } from './Game/GameContext';
import { CombatContextProvider } from './Game/Context/CombatContext';
import MainPage from './Game/MainPage';

function App() {
  return (
    <GameContextProvider>
      <CombatContextProvider>
      <div className="App">
        <MainPage className='poo' />
      </div>
      </CombatContextProvider>
    </GameContextProvider>
  );
}

export default App;
