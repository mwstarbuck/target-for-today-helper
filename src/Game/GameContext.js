import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [campaign, setCampaign] = useState();
  const [bomber, setBomber] = useState();
  const [noseTurret, setNoseTurret] = useState();
  const [period, setPeriod] = useState();

  return (
    <GameContext.Provider value={{
      step,
      setStep,
      campaign,
      setCampaign,
      bomber,
      setBomber,
      period,
      setPeriod,
      noseTurret, 
      setNoseTurret
    }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContext;