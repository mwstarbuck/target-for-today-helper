import React, { useState, useContext } from 'react';
import { Row, Col, Checkbox, Button } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';


const DOFighters = () => {
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData;

  const onChange = (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    let wDCopy = [...waveData]
    wDCopy[id].drivenOff = checked;
    combatCTX.setWaveData(wDCopy);  
  }

  const onRemoveFighters = () => {
    let wDCopy = [...waveData]
    const newWaveData = wDCopy.filter(f => f.drivenOff === false);
    combatCTX.setWaveData(newWaveData);
  }

  if (waveData?.length === 0)
    return <div style={{ width: 350, minWidth: 350, margin: 16, fontSize: 15, fontWeight: 600 }}>All fighters have been driven off. Click Ok or Cancel button to close modal.</div>
  return (<>
    <div style={{ textAlign: 'center' }}>
      {waveData?.map((f, i) => <div key={i} style={{ width: 350, minWidth: 350, border: '1px solid lightgrey', margin: 16, boxShadow: '2px 1px 1px grey', backgroundColor: '#ededed' }}>
      <Row gutter={5} style={{ paddingLeft: 8, marginBottom: -10, marginTop: 6}}>
        <Col span={6}><p style={{fontSize: 14, fontWeight: 600}}>{f.type}</p></Col>
        <Col span={9}><p>{f.angle} {f.level}</p></Col>
        {f.angle !== 'Vertical Dive' && <Col span={9} style={{ textAlign: 'right' }}><Checkbox id={i} onChange={onChange}>Driven Off</Checkbox></Col>}
      </Row>
    </div>
    )}
    </div>
    <div style={{marginLeft: 105}}><Button onClick={() => onRemoveFighters()}>Remove Fighter(s)</Button></div>
  </>
  )

}

export default DOFighters;