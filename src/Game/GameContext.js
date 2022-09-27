import React, { createContext, useState, useEffect } from 'react';

export const GameContext = createContext();

const GameContextProvider = ({children}) => {
  const [campaign, setCampaign] = useState(null)

  return <GameContext.Provider value={[
    campaign,
    setCampaign
  ]}>
  {children}
  </GameContext.Provider>
}
export default GameContextProvider;