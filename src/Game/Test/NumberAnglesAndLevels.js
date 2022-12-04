import React, { useState, useContext } from 'react';
import Select from 'react-select';
import EnterAnglesLevels from './EnterAngleLevel';
import { Row, Col, Divider, Radio } from 'antd';



const number = [
  { value: 1, label: 1 },
  { value: 2, label: 2 },
  { value: 3, label: 3 },
  { value: 4, label: 4 },
  { value: 5, label: 5 }
]

const NumberAnglesAndLevels = () => {
  const [fighterNumber, setFighterNumber] = useState(null);

  const onChange = (e) => {
    const number = e.value;
    setFighterNumber(number)
  }

  let fighters = [];
  for (let i = 0; i < fighterNumber; i++) {
    fighters.push(
      <Col key={i} span={24}>
        <EnterAnglesLevels number={i + 1} />
      </Col>)
  }

  return <div>
    <div>Select Number of Fighers rolled in the wave.</div>
    <Select options={number} onChange={onChange} value={fighterNumber} />
    <Row gutter={[2, 5]}>
      {fighters.length > 0 && fighters.map(f => f)}
    </Row>
  </div>
}

export default NumberAnglesAndLevels;