import React, { createContext, useState, useEffect } from 'react';

export const CombatContext = createContext();

export const CombatContextProvider = ({ children }) => {
  const [waveData, setWaveData] = useState(null);
  const [wave, setWave] = useState();
  const [activeGuns, setActiveGuns] = useState([]);

  return <CombatContext.Provider value={{
    waveData, setWaveData,
    activeGuns, setActiveGuns
  }}>
    {children}
  </CombatContext.Provider>
}

export default CombatContext;