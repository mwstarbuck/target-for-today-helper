import './App.css';
import "antd/dist/antd.css";
import GamePage from './Game/GamePage';
import { GameContextProvider } from './Game/GameContext';
import MainPage from './Game/MainPage';

function App() {
  return (
    <GameContextProvider>
      <div className="App">
        <MainPage className='poo' />
      </div>
    </GameContextProvider>
  );
}

export default App;
