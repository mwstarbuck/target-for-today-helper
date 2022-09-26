import React, { createContext, useState, useEffect } from 'react';

const Context = createContext(null);

const GameContext = () => {
  const [campaign, setCampaign] = useState(null)

  return <Context.Provider value={Context}>

  </Context.Provider>

}

export default GameContext;