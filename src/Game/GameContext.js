import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [campaign, setCampaign] = useState();

  useEffect(() => {

  })

  return (
    <GameContext.Provider value={{
      campaign,
      setCampaign
    }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContext;