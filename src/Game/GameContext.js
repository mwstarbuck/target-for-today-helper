import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [gameStep, setGameStep] = useState();
  const [campaign, setCampaign] = useState();
  const [bomber, setBomber] = useState();
  const [noseTurret, setNoseTurret] = useState();
  const [timePeriod, setTimePeriod] = useState();
  const [target, setTarget] = useState();
  const [crew, setCrew] = useState();
  const [targetType, setTargetType] = useState();
  const [cell, setCell] = useState({});
  const [bomberNumber, setBomberNumber] = useState();


  return (
    <GameContext.Provider value={{
      step,
      setStep,
      gameStep,
      setGameStep,
      campaign,
      setCampaign,
      bomber,
      setBomber,
      timePeriod,
      setTimePeriod,
      noseTurret,
      setNoseTurret,
      target,
      setTarget,
      crew,
      setCrew,
      targetType,
      setTargetType,
      cell,
      setCell,
      bomberNumber,
      setBomberNumber
    }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContext;