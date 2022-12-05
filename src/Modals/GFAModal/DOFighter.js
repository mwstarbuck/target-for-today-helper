import React, { useState, useContext } from 'react';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import { Row, Col, Divider, Checkbox, Button } from 'antd';
import { fighters, angles } from '../../Data/Options';
import Guns from '../../Game/PageComponents/Combat/Guns';
import CombatContext from '../../Game/Context/CombatContext';


const DOFighters = (/*{ number, waveData, setWaveData }*/) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData

  const onChange = (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    let wDCopy = [...waveData]
    console.log(e);
    wDCopy[id].drivenOff = checked;
    // const newWaveData = wDCopy.filter(f => f.drivenOff === false);
    combatCTX.setWaveData(wDCopy);
    console.log(waveData);
  }

  const onRemoveFighters = () => {
    let wDCopy = [...waveData]
    const newWaveData = wDCopy.filter(f => f.drivenOff === false);
    combatCTX.setWaveData(newWaveData);
  }

  if (waveData.length === 0)
    return <div style={{ width: 350, minWidth: 350, margin: 16, fontSize: 15, fontWeight: 600 }}>All fighters have been driven off. Click Ok or Cancel button to close modal.</div>
  return (<>
    {waveData?.map((f, i) => <div key={i} style={{ width: 350, minWidth: 350, border: '1px solid grey', margin: 16 }}>
      <Row gutter={5} style={{padding: 5}}>
        <Col span={6}><p style={{fontSize: 13, fontWeight: 600}}>{f.type}</p></Col>
        <Col span={9}><p>{f.angle} {f.level}</p></Col>
        <Col span={9} style={{ textAlign: 'right' }}><Checkbox id={i} onChange={onChange}>Driven Off</Checkbox></Col>
      </Row>
    </div>
    )}
    <Button onClick={() => onRemoveFighters()}>Remove Fighter(s)</Button>
  </>
  )

}

export default DOFighters;