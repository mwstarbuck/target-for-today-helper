import React, { useState, useContext } from 'react';
import { Row, Col, Checkbox, Button, Divider } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';
import BomberGuns from './BomberGuns';


const TargetFighters = ({activeGuns, setActiveGuns}) => {
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData

  const onChange = (e) => {
    const id = e.target.id;
    const checked = e.target.checked;
    let wDCopy = [...waveData]
    wDCopy[id].drivenOff = checked;
    combatCTX.setWaveData(wDCopy);
  }

  const onClick = () => {
    let tempData = [...waveData];
    activeGuns?.forEach(g => tempData[g.id].targetedBy.push(g.gun));
    combatCTX.setWaveData(tempData);
  }

  return (<>
      {waveData?.map((f, i) => <div key={i} style={{ width: 450, minWidth: 450, height: 75, border: '1px solid lightgrey', margin: 16, boxShadow: '2px 1px 1px grey', backgroundColor: '#ededed' }}>
        <Row gutter={5} style={{ paddingLeft: 8, marginBottom: -10, marginTop: 6 }}>
          <Col span={6} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{f.type}</p></Col>
          <Col span={18} style={{ borderBottom: '1px solid lightgrey' }}><p>{f.angle} {f.level}</p></Col>
          <Col span={24} style={{ marginTop: 5 }}><BomberGuns fighter={i} activeGuns={activeGuns} setActiveGuns={setActiveGuns} angle={f.angle} level={f.level} /></Col>
        </Row>
      </div>
      )}
    {/* </div> */}
    <div style={{ marginLeft: 155, marginBottom: 25 }}><Button onClick={onClick}>Confirm Targets</Button></div>
  </>
  )

}

export default TargetFighters;