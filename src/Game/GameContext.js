import React, { createContext, useState, useEffect } from 'react';
import { pilotCompStatus, noseCompStatus, waistCompStatus, TTRCompStatus, 
  radioCompStatus, bombBayStatus, tailSectionStatus, controlCablesStatus } from '../Data/CompartmentStatus';

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
  const [step, setStep] = useState(0);
  const [gameStep, setGameStep] = useState();
  const [campaign, setCampaign] = useState();
  const [modifiers, setModifiers] = useState([]);
  const [bomber, setBomber] = useState();
  const [noseTurret, setNoseTurret] = useState();
  const [timePeriod, setTimePeriod] = useState();
  const [target, setTarget] = useState();
  const [crew, setCrew] = useState();
  const [targetType, setTargetType] = useState();
  const [cell, setCell] = useState({});
  const [bomberNumber, setBomberNumber] = useState();
  const [zones, setZones] = useState();
  const [zonesInfo, setZonesInfo] = useState(null);
  const [currentZone, setCurrentZone] = useState(1);
  const [targetZone, setTargetZone] = useState(null);
  const [outbound, setOutbound] = useState(true);
  const [waveTotal, setWaveTotal] = useState(null);
  const [waveCount, setWaveCount] = useState(0);
  const [round, setRound] = useState(0);
  const [escort, setEscort] = useState(null);
  const [weather, setWeather] = useState(null);
  const [contrails, setContrails] = useState(null);
  const [resistance, setResistance] = useState(null);
  const [nose, setNose] = useState(noseCompStatus);
  const [pilotComp, setPilotComp] = useState(pilotCompStatus);
  const [waistComp, setWaistComp] = useState(waistCompStatus);
  const [TTRComp, setTTRComp] = useState(TTRCompStatus);
  const [radioComp, setRadioComp] = useState(radioCompStatus);
  const [bombBay, setBombBay] = useState(bombBayStatus);
  const [tailSection, setTailSection] = useState(tailSectionStatus);
  const [controlCables, setControlCables] = useState(controlCablesStatus);

  

  return (
    <GameContext.Provider value={{
      step,
      setStep,
      gameStep,
      setGameStep,
      campaign,
      setCampaign,
      modifiers,
      setModifiers,
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
      setBomberNumber,
      zones,
      setZones,
      zonesInfo, setZonesInfo,
      currentZone, setCurrentZone,
      targetZone, setTargetZone,
      outbound,setOutbound,
      waveTotal, setWaveTotal,
      waveCount, setWaveCount,
      round, setRound,
      escort, setEscort,
      weather, setWeather,
      contrails, setContrails,
      resistance, setResistance,
      nose, setNose,
      pilotComp, setPilotComp,
      waistComp, setWaistComp,
      TTRComp, setTTRComp,
      radioComp, setRadioComp,
      bombBay, setBombBay,
      tailSection, setTailSection,
      controlCables, setControlCables,
    }}
    >
      {children}
    </GameContext.Provider>
  );
};
export default GameContext;