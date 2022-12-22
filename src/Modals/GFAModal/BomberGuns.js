import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Radio, Divider, Checkbox } from 'antd';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import Gun from './Gun';

const BomberGuns = ({ angle, level, fighter, guns}) => {
  const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const [elligibleGuns, setElligibleGuns] = useState(guns); //make ctx
  const [selectedGuns, setSelectedGuns] = useState([]); //make ctx
  const waveData = combatCTX.waveData;

  const onGunSelect = (e) => {
    const checked = e.target.checked;
    const id = e.target.fighter;
    const gun = e.target.name;
    let newD = [...combatCTX.waveData];
    newD[id].guns.forEach(g => {
      if (g.gun === gun)
        g.checked = checked
      const angle = newD[id].angle;
      if (g.gun === 'Tail Turr' || g.gun === 'Tail Guns'){
        if (angle === '12:00' || angle === '1:30' || angle === '10:30'){
          newD[id].passingShot = true;
        }
      }
    });
    if (checked){
      let newActiveGuns = [...combatCTX.activeGuns];
      newActiveGuns.push({gun: gun, id: id});
      combatCTX.setActiveGuns(newActiveGuns);
    }
    else {
      let temp = [...combatCTX.activeGuns];
      const newActiveGuns = temp.filter(g => g.gun !== gun);
      combatCTX.setActiveGuns(newActiveGuns);
    }
    combatCTX.setWaveData(newD);
  }

  const showPS = (g) => {
    if ((angle === '12:00' || angle === '1:30' || angle === '10:30') 
      && (g.gun === 'Tail Turr' || g.gun === 'Tail Guns') && g.checked) {
        
        return '(PS)'
    }
  }

  console.log(waveData);
  return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 0, paddingLeft: 8 }}>
    {waveData[fighter].guns?.map((g, i) => <Checkbox key={i} checked={g.checked} fighter={fighter} onChange={onGunSelect} disabled={g.inoperable || g.inUse} name={g.gun}>{g.gun}{showPS(g)}</Checkbox>)}
  </div>
}

export default BomberGuns;