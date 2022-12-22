import React, { useState, useContext } from 'react';
import { Row, Col, Radio, Button } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';


const BDFFighter = ({ type, skill, status, angle, level, guns, id }) => {
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData;
  const activeGun = combatCTX.activeGun;


  const onStatusChange = (e) => {
    const status = e.target.value
    let newD = [...waveData];
    newD[e.target.id].status = e.target.value
    combatCTX.setWaveData(newD);
  }

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

  console.log(waveData);
  return (<>
    <div id={id} style={{ width: 480, minWidth: 480, height: 125, border: '1px solid lightgrey', margin: 16, boxShadow: '2px 1px 1px grey', backgroundColor: '#ededed' }}>
      <Row id={id} gutter={5} style={{ paddingLeft: 8, marginBottom: -10, marginTop: 6 }}>
        <Col span={5} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{type}</p></Col>
        <Col span={4} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{skill}</p></Col>
        <Col span={10} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{angle} {level}</p></Col>
        <Col id={id} span={5}><div onClick={(e) => onRemove(e, id)}>Remove</div></Col>
        <Col span={4} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600, paddingTop: 4, }}>Status:</p></Col>
        <Col span={20} style={{ borderBottom: '1px solid lightgrey' }}>
          <Radio.Group name='status' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingTop: 4, paddingLeft: 8 }} onChange={onStatusChange} value={status} defaultValue='average'>
            <Radio id={id} value={'FCA'}>FCA</Radio>
            <Radio id={id} value={'2 FCA'}>2FCA</Radio>
            <Radio id={id} value={'FBOA'}>FBOA</Radio>
            <Radio id={id} value={'FCAB'}>FCAB</Radio>
          </Radio.Group>
        </Col>
        <Col span={8} style={{ marginTop: 5 }}><p style={{ fontSize: 14, fontWeight: 600 }}>Tageted By:</p></Col>
        <Col span={12} style={{ marginTop: 5 }}>
          <Radio.Group name='gun' style={{ display: 'flex', flexDirection: 'row', justifyContent: 'left' }} onChange={onGunChange} value={activeGun?.gun}>
            {guns.map((g, i) => g.checked && <Radio id={i} value={g.gun}>{g.gun}</Radio>
            )}
          </Radio.Group>
        </Col>
      </Row>
    </div>
  </>
  )

}

export default BDFFighter;