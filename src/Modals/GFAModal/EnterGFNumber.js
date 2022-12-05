import React, { useState, useContext } from 'react';
import Select from 'react-select';
import EnterGFAnglesLevels from './EnterGFAngleAndLevel'
import { Row, Col, Divider, Radio, Button } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';



const number = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 }
]

const EnterGFNumber = ({setShowModal}) => {
  const combatCTX = useContext(CombatContext);
  const [fighterNumber, setFighterNumber] = useState(null);
  const [waveData, setWaveData] = useState(null);
  const [showNext, setShowNext] = useState(false)

  const onChange = (e) => {
    const number = e.value;
    setFighterNumber(number)
    let fighters = [];
    for (let i = 0; i < number; i++) {
      fighters.push({
        id: i + 1,
        type: null,
        angle: null,
        level: null,
        skill: 'average',
        status: null,
        targetedBy: [],
        attacks: null
      })
    }
    setWaveData(fighters);
  }

  const onClick = () => {
    combatCTX.setWaveData(waveData);
    setShowModal(false);

    // console.log(combatCTX.waveData);
  }

  // let fighters = [];
  // for (let i = 0; i < fighterNumber; i++) {
  //   fighters.push(
  //     <Col key={i} span={24}>
  //       <EnterAnglesLevels number={i + 1} />
  //     </Col>)
  // }
  console.log(combatCTX.waveData);

  const wave = waveData?.map((f, i) => <Col key={f.id} span={24}>
    <EnterGFAnglesLevels number={i} waveData={waveData} setWaveData={setWaveData} />
  </Col>)
  return <div>
    <div>Select Number of Fighers rolled in the wave.</div>
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ width: 400, alignSelf: 'center', padding: 10 }}>
        <Select options={number} onChange={onChange} value={fighterNumber} />
      </div>
    </div>
    <Row gutter={[2, 5]}>
      {wave?.length > 0 && wave.map(f => f)}
      <Col span={24} style={{ textAlign: 'center'}}>
        <Button onClick={onClick}>Ok</Button>
      </Col>
    </Row>
  </div>
}

export default EnterGFNumber;