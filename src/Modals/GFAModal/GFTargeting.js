import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Popover, Row, Col } from 'antd';
import TargetFighters from './TargetFighters';
import CombatContext from '../../Game/Context/CombatContext';

const GFTargeting = (props) => {
  const combatCTX = useContext(CombatContext);
  // const activeGuns = combatCTX.activeGuns;
  // const setActiveGuns = combatCTX.setActiveGuns
  const { opacity} = props;
  const [activeGuns, setActiveGuns] = useState([]);

  const inUse = (gun, id) => {
    const targetAndGun = combatCTX.activeGuns.find(g => g.gun === gun.gun);
    if (targetAndGun) {
      if (targetAndGun.id === id) {
        // gun.inUse = false;
        return false
      }
      else {
        return true
        // gun.inUse = true;
        console.log(gun);
      }
    }
    return false;
    // gun.inUse = false;
  }

  useMemo(() => {
    let newD = [...combatCTX.waveData]
    newD.forEach(f => {
      f.guns.forEach(g => {
        g.inUse = inUse(g, f.id);
      })
    });
    combatCTX.setWaveData(newD);
    
  }, [combatCTX.activeGuns])


  return <>
    <Row>
      <Col span={24}>
        <TargetFighters activeGuns={activeGuns} setActiveGuns={setActiveGuns} />
      </Col>
    </Row>
  </>
}

export default GFTargeting;