import React, { useState, useContext } from 'react';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import { Row, Col, Divider, Radio, Button } from 'antd';
import { fighters, angles } from '../../Data/Options';
import Guns from '../../Game/PageComponents/Combat/Guns';
import CombatContext from '../../Game/Context/CombatContext';


const DOFighters = (/*{ number, waveData, setWaveData }*/) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData
  // const angle = waveData[number].angle;
  // const level = waveData[number].level
  // const [type, setType] = useState(details.type);
  // const [skill, setSkill] = useState(details.skill);
  // const [status, setStatus] = useState(details.status);
  // const [angle, setAngle] = useState(details.angle);
  // const [level, setLevel] = useState(details.level);
  // const [attacks, setAttack] = useState(details.attacks);
  // const [targetedBy, setTargetedBy] = useState(details.targetedBy);

  // const onFighterChange = (e) => {
  //   console.log(e);
  //   const type = e.value;
  //   const attacks = e.attacks;
  //   let temp = [...waveData];
  //   temp[number].type = type;
  //   temp[number].attacks = attacks;
  //   setWaveData(temp);
  //   // setType(type);
  // }

  // const onAngleChange = (e) => {
  //   const angle = e.value
  //   let temp = [...waveData]
  //   temp[number].angle = angle
  //   if (angle === 'Vertical Climb' || angle === 'Vertical Dive') {
  //     temp[number].level = null;
  //   }
  //   setWaveData(temp)
  //   // setAngle(angle);
  //   console.log(angle);
  // }

  // const onLevelChange = (e) => {
  //   const level = e.target.value
  //   let temp = [...waveData]
  //   temp[number].level = level
  //   setWaveData(temp)
  //   // setLevel(level);
  // }

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
  return (<>
    {waveData?.map((f, i) => <div style={{ width: 450, minWidth: 450, border: '1px solid grey', margin: 16 }}>
      <Row style={{padding: 5}}>
        <Col span={4}><p>{f.type}</p></Col>
        <Col span={4}><p>{f.angle}</p></Col>
        <Col span={3}><p>{f.level}</p></Col>
        <Col span={13} style={{ textAlign: 'right' }}><Button>Driven Off</Button></Col>
      </Row>
    </div>
    )}
  </>
  )

}

export default DOFighters;