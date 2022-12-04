import React, { useState, useContext } from 'react';
import Select from 'react-select';
import GameContext from '../GameContext';
import { Row, Col, Divider, Radio, Button } from 'antd';
import { fighters, angles } from '../../Data/Options';
import Guns from '../PageComponents/Combat/Guns';


const EnterGFAnglesLevels = ({ number, waveData, setWaveData }) => {
  const ctx = useContext(GameContext);
  const angle = waveData[number].angle;
  const level = waveData[number].level
  // const [type, setType] = useState(details.type);
  // const [skill, setSkill] = useState(details.skill);
  // const [status, setStatus] = useState(details.status);
  // const [angle, setAngle] = useState(details.angle);
  // const [level, setLevel] = useState(details.level);
  // const [attacks, setAttack] = useState(details.attacks);
  // const [targetedBy, setTargetedBy] = useState(details.targetedBy);

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

  // const onSkillChange = (e) => {
  //   const skill = e.target.value
  //   setSkill(skill);
  // }

  // const onStatusChange = (e) => {
  //   const status = e.target.value
  //   setStatus(status);
  // }

  // const onGunSelect = (e) => {
  //   const gun = e.target.value
  //   setSelectedGun(gun);
  // }
  return <div style={{ width: 550, minWidth: 550, border: '1px solid black', margin: 16 }}>
    {number + 1}
    <Row gutter={[10, 5]} style={{ padding: 5 }}>
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
      {/* <Col span={11} style={{ borderRight: '1px solid grey', paddingRight: 2 }}>
        <Radio.Group name='skill' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8 }} onChange={onSkillChange} value={skill} defaultValue='average'>
          <Radio value={'green'}>Green</Radio>
          <Radio value={'average'}>Average</Radio>
          <Radio value={'ace'}>Ace</Radio>
        </Radio.Group>
      </Col>
      <Col span={13}>
        <Radio.Group name='status' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 8, paddingLeft: 8 }} onChange={onStatusChange} value={status} defaultValue='average'>
          <Radio value={'FCA'}>FCA</Radio>
          <Radio value={'2 FCA'}>2FCA</Radio>
          <Radio value={'FBOA'}>FBOA</Radio>
          <Radio value={'FCAB'}>FCAB</Radio>
        </Radio.Group>
      </Col>
    </Row>
    <Divider type='vertical' style={{ color: 'black' }} />
    <Row>
      <Col span={24}>Choose Bomber Gun</Col>
      <Col span={24}>
        <Guns angle={angle} level={level} tt={ctx.pilotComp.tTurretInoperable} />
      </Col> */}
    </Row>
  </div>

}

export default EnterGFAnglesLevels;