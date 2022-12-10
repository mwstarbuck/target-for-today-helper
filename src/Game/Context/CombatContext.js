import React, { createContext, useState, useEffect } from 'react';

export const CombatContext = createContext();

export const CombatContextProvider = ({ children }) => {
  const [waveData, setWaveData] = useState(null);
  const [wave, setWave] = useState();
  const [activeGuns, setActiveGuns] = useState([]);
  const [targetedFighter, setTargetedFighter] = useState(null);
  const [activeGun, setActiveGun] = useState(null);

  return <CombatContext.Provider value={{
    waveData, setWaveData,
    activeGuns, setActiveGuns,
    targetedFighter, setTargetedFighter,
    activeGun, setActiveGun
  }}>
    {children}
  </CombatContext.Provider>
}

export default CombatContext;