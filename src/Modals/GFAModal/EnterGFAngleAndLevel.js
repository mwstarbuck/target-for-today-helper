import React, { useState, useContext } from 'react';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import { Row, Col, Divider, Radio, Button } from 'antd';
import { fighters, angles } from '../../Data/Options';
import Guns from '../../Game/PageComponents/Combat/Guns';


const EnterGFAnglesLevels = ({ number, waveData, setWaveData }) => {
  const ctx = useContext(GameContext);
  const angle = waveData[number].angle;
  const level = waveData[number].level

  const onFighterChange = (e) => {
    console.log(e);
    const type = e.value;
    const attacks = e.attacks;
    let temp = [...waveData];
    temp[number].type = type;
    temp[number].attacks = attacks;
    setWaveData(temp);
    // setType(type);
  }

  const onAngleChange = (e) => {
    const angle = e.value
    let temp = [...waveData]
    temp[number].angle = angle
    if (angle === 'Vertical Climb' || angle === 'Vertical Dive') {
      temp[number].level = null;
    }
    setWaveData(temp)
    // setAngle(angle);
    console.log(angle);
  }

  const onLevelChange = (e) => {
    const level = e.target.value
    let temp = [...waveData]
    temp[number].level = level
    setWaveData(temp)
    // setLevel(level);
  }

  return <div style={{ width: 450, minWidth: 450, border: '1px solid black', margin: 16 }}>
    {/* {number + 1} */}
    <Row gutter={[10, 5]} style={{ padding: 5}}>
      <Col span={4} style={{alignContent: 'center'}}>{number + 1}</Col>
      <Col span={24}>
        <Select
          options={fighters}
          onChange={(e) => onFighterChange(e)}
        />
      </Col>
      <Col span={12}>
        <Select
          options={angles}
          onChange={(e) => onAngleChange(e)}
        />
      </Col>
      <Col span={12}>
        <Radio.Group name='level' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8 }} onChange={onLevelChange} value={level}>
          <Radio
            disabled={angle === 'Vertical Climb' || angle === 'Vertical Dive'}
            value={'high'}>
            High</Radio>
          <Radio
            disabled={angle === 'Vertical Climb' || angle === 'Vertical Dive'}
            value={'level'}>
            Level</Radio>
          <Radio
            disabled={angle === 'Vertical Climb' || angle === 'Vertical Dive'}
            value={'low'}>
            Low</Radio>
        </Radio.Group>
      </Col>
    </Row>
  </div>

}

export default EnterGFAnglesLevels;