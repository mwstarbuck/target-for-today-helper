import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [campaign, setCampaign] = useState();
  const [bomber, setBomber] = useState();

  return (
    <GameContext.Provider value={{
      step,
      setStep,
      campaign,
      setCampaign,
      bomber,
      setBomber
    }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContext;