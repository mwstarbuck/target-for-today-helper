import React, { useState, useContext } from 'react';
import Select from 'react-select';
import EnterGFAnglesLevels from './EnterGFAngleAndLevel'
import { Row, Col, Divider, Radio, Button } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';
import GameContext from '../../Game/GameContext';
import { createGunList } from './GFHelpers';

const number = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 }
]

const EnterGFNumber = () => {
  const combatCTX = useContext(CombatContext);
  const ctx = useContext(GameContext);
  const [fighterNumber, setFighterNumber] = useState(null);
  const [waveData, setWaveData] = useState(null);
  const [showNext, setShowNext] = useState(false)

  const onChange = (e) => {
    const number = e.value;
    setFighterNumber(number)
    let fighters = [];
    for (let i = 0; i < number; i++) {
      fighters.push({
        id: i,
        type: null,
        angle: null,
        level: null,
        skill: 'average',
        status: null,
        guns: [],
        targetedByGuns: [],
        attacks: null,
        drivenOff: false
      })
    }
    setWaveData(fighters);
  }

  const onClick = () => {

    const newD = [...waveData]
    newD.map(f => {
      const guns = createGunList(ctx, f)
      f.guns = guns;
    })
    combatCTX.setWaveData(newD);
  }

  const wave = waveData?.map((f, i) => <Col key={f.id} span={24}>
    <EnterGFAnglesLevels number={i} waveData={waveData} setWaveData={setWaveData} />
  </Col>)

  return <div>
    {ctx.round === 1 && <><div>Select Number of Fighers rolled in the wave.</div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: 400, alignSelf: 'center', padding: 10 }}>
        <Select options={number} onChange={onChange} value={fighterNumber} />
      </div>
      </div></>}
    <Row gutter={[2, 5]}>
      {wave?.length > 0 && wave.map(f => f)}
      <Col span={24} style={{ textAlign: 'center'}}>
        <Button onClick={onClick}>Ok</Button>
      </Col>
    </Row>
  </div>
}

export default EnterGFNumber;