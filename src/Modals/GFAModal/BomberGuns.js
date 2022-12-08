import React, { useContext, useState, useEffect } from 'react';
import { Row, Col, Radio, Divider, Checkbox } from 'antd';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import Gun from './Gun';

const BomberGuns = ({ angle, level, activeGuns, setActiveGuns, fighter, guns}) => {
  const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const [elligibleGuns, setElligibleGuns] = useState(guns); //make ctx
  const [selectedGuns, setSelectedGuns] = useState([]); //make ctx
  const waveData = combatCTX.waveData;

  const inUse = (gun) => {
    const targetAndGun = activeGuns.find(g => g.gun === gun);
    if (targetAndGun) {
      if (targetAndGun.id === fighter){
        return false
      }
      else {
        return true
      }
    }
    return false
  }
  const createGunList = () => {
    const bomber = ctx.bomber;
    const nose = ctx.nose;
    const pilotComp = ctx.pilotComp;
    let guns = [];
    switch (angle) {
      case '12:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') });
          if (bomber === 'B-17F' || bomber === 'B-24D')
            guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun, inUse: inUse('Nose Gun') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') });
          if (bomber === 'B-17F' || bomber === 'B-24D')
            guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun, inUse: inUse('Nose Gun') });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: inUse('Chin Turr') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') });
          if (bomber === 'B-17F' || bomber === 'B-24D')
            guns.push({ gun: 'Nose Gun', inoperable: nose.noseGun, inUse: inUse('Nose Gun') });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: inUse('Chin Turr') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        break;
      case '1:30':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') }, { gun: 'Right Wst', inoperable: 'todo', inUse: inUse('Right Wst') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun, inUse: inUse('Right Chk') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun, inUse: inUse('Right Chk') });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: inUse('Chin Turr') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Right Chk', inoperable: nose.rightCheekGun, inUse: inUse('Right Chk') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
            guns.push({ gun: 'Right Wst', inoperable: 'todo', inUse: inUse('Right Wst') });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: inUse('Chin Turr') });
          if (bomber === 'B-24J')
            guns.push({
              gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        break;
      case '3:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') }, { gun: 'Right Wst', inoperable: 'todo', inUse: inUse('Right Wst') });
          
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') },
            { gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') }, { gun: 'Right Wst', inoperable: 'todo', inUse: inUse('Right Wst') });
          
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') }, { gun: 'Right Wst', inoperable: 'todo', inUse: inUse('Right Wst') });
      
        }
        break;
      case '6:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') }, { gun: 'Right Wst', inoperable: 'todo', inUse: inUse('Right Wst') });
          if (bomber === 'B-17F' || bomber === 'B-17G')
            guns.push({ gun: 'Radio Rm', inoperable: 'todo', inUse: inUse('Radio Rm') }, { gun: 'Tail Gun', inoperable: 'todo', inUse: inUse('Tail Gun') });
          if (bomber === 'B-24D' || bomber === 'B-24J')
            guns.push({ gun: 'Tail Turr', inoperable: 'todo', inUse: inUse('Tail Turr') });
        }
        if (level === 'level') {
          if (bomber === 'B-17F' || bomber === 'B-17G')
            guns.push({ gun: 'Tail Gun', inoperable: 'todo', inUse: inUse('Tail Gun') });
          if (bomber === 'B-24D' || bomber === 'B-24J')
            guns.push({ gun: 'Tail Turr', inoperable: 'todo', inUse: inUse('Tail Turr') });
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') });
          if (bomber === 'B-17F' || bomber === 'B-17G')
            guns.push({ gun: 'Tail Gun', inoperable: 'todo', inUse: inUse('Tail Gun') });
          if (bomber === 'B-24D' || bomber === 'B-24J')
            guns.push({ gun: 'Tail Turr', inoperable: 'todo', inUse: inUse('Tail Turr') });
        }
        break;
      case '9:00':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') }, { gun: 'Left Wst', inoperable: 'todo', inUse: inUse('Left Wst') });

        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') },
            { gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') }, { gun: 'Left Wst', inoperable: 'todo', inUse: inUse('Left Wst') });

        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') }, { gun: 'Left Wst', inoperable: 'todo', inUse: inUse('Left Wst') });

        }
        break;
      case '10:30':
        if (level === 'high') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') }, { gun: 'Left Wst', inoperable: 'todo', inUse: inUse('Left Wst') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Left Chk', inoperable: nose.rightCheekGun, inUse: inUse('Left Chk') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        if (level === 'level') {
          guns.push({ gun: 'Top Turr', inoperable: pilotComp.tTurretInoperable, inUse: inUse('Top Turr') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Left Chk', inoperable: nose.rightCheekGun, inUse: inUse('Left Chk') });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: inUse('Chin Turr') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        if (level === 'low') {
          guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D')
            guns.push({ gun: 'Left Chk', inoperable: nose.rightCheekGun, inUse: inUse('Left Chk') });
          if (bomber === 'B-17F' || bomber === 'B-17G' || bomber === 'B-24D' || bomber === 'B-24J')
            guns.push({ gun: 'Left Wst', inoperable: 'todo', inUse: inUse('Left Wst') });
          if (bomber === 'B-17G')
            guns.push({ gun: 'Chin Turr', inoperable: nose.noseGun, inUse: inUse('Chin Turr') });
          if (bomber === 'B-24J')
            guns.push({ gun: 'Nose Turr', inoperable: nose.noseGun, inUse: inUse('Nose Turr') });
        }
        break;
      case 'Vertical Dive':
        guns.push({ gun: 'Top Turr', inoperable: 'todo', inUse: inUse('Top Turr') });
        if (bomber === 'B-17G')
          guns.push({ gun: 'Radio Rm', inoperable: 'todo', inUse: inUse('Radio Rm') }); //optional rule 10.5.3
        break;
      case 'Vertical Climb':
        guns.push({ gun: 'Ball Turr', inoperable: 'todo', inUse: inUse('Ball Turr') });
        break;
      default:
        break;
    }
    // return guns;
    setElligibleGuns(guns);
  }

  const onGunSelect = (e) => {
    const checked = e.target.checked;
    const id = e.target.fighter;
    const gun = e.target.name;
    let newD = [...combatCTX.waveData];
    newD[id].guns.forEach(g => {
      if (g.gun === gun)
        g.checked = checked
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

  return <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 0, paddingLeft: 8 }}>
    {waveData[fighter].guns?.map((g, i) => <Checkbox key={i} checked={g.checked} fighter={fighter} onChange={onGunSelect} disabled={g.inoperable || g.inUse} name={g.gun}>{g.gun}</Checkbox>)}

    {/* {elligibleGuns?.map((g, i) => <Gun 
                                    key={i} 
                                    fighter={fighter}
                                    onGunSelect={onGunSelect}
                                    gun={g}
                                    checked={g.checked}
                                    />)} */}
  </div>
}

export default BomberGuns;