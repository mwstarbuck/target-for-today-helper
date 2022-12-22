import React, { useState, useContext } from 'react';
import { Row, Col, Radio, Button } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';


const GOFFighter = ({ type, skill, status, angle, level, guns, id }) => {
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData;
  const activeGun = combatCTX.activeGun;

  const onGunChange = (e) => {
    const id = e.target.id;
    const gun = e.target.value;
    const activeGun = { id: id, gun: gun };
    combatCTX.setActiveGun(activeGun);
  }

  const onRemove = (e, id) => {
    let newD = [...waveData];
    const newWaveData = newD.splice(id, 1);
    combatCTX.setWaveData(newD);
  }

  const getSkillColor = (skill) => {
    if(skill === 'green')
      return 'green';
    else if (skill === 'average')
      return 'black';
    else 
      return 'red';
  }

return <>
    <div id={id} style={{ width: 460, minWidth: 460, height: 75, border: '1px solid lightgrey', margin: 16, boxShadow: '2px 1px 1px grey', backgroundColor: '#ededed' }}>
      <Row id={id} gutter={5} style={{ paddingLeft: 8, marginBottom: -10, marginTop: 6 }}>
        <Col span={5} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{type}</p></Col>
        <Col span={4} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ color: getSkillColor(skill), fontSize: 14, fontWeight: 600 }}>{skill}</p></Col>
        <Col span={10} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{angle} {level}</p></Col>
        <Col id={id} span={5}><div onClick={(e) => onRemove(e, id)}>Remove</div></Col>
        <Col span={4}><p style={{ fontSize: 14, fontWeight: 600, paddingTop: 4, }}>Status:</p></Col>
        <Col span={20}>
        <p style={{ fontSize: 14, fontWeight: 600, paddingTop: 4, color: 'red' }}>{status}</p>
        </Col>
      </Row>
    </div>
  </>

}

export default GOFFighter;