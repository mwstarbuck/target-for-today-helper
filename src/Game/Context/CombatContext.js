import React, { createContext, useState, useEffect } from 'react';

export const CombatContext = createContext();

export const CombatContextProvider = ({ children }) => {
  const [waveData, setWaveData] = useState(null);
  const [wave, setWave] = useState();

  return <CombatContext.Provider value={{
    waveData, setWaveData,
  }}>
    {children}
  </CombatContext.Provider>
}

export default CombatContext;