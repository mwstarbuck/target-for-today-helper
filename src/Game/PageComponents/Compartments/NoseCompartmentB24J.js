import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  sightOut: false,//
  noseGunInop: false,//
  conTurrStuck: false,
  conTurrHydrOut: false,
  emmerElecOut: false,
  emmerPowerOut: false,
  bombCtrlInop: false,//
  navEquipInop: false,//
  bombHeatOut: false,
  navHeatOut: false,
  nGunHeatOut: false,
  bombO2Out: false,
  navO2Out: false,
  nGunO2Out: false,
}

const NoseCompartmentB24J = () => {
  const ctx = useContext(GameContext);
  const [noseB24J, setNoseB24J] = useState(ctx.noseB24J || problems);
 
  useEffect(() => {
    setNoseB24J(ctx.noseB24J);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newNose = { ...noseB24J };
    switch (name) {
      case 'sightOut':
        newNose.sightOut = checked
        break;
      case 'noseGunInop':
        newNose.noseGunInop = checked
        break;
      case 'conTurrStuck':
        newNose.conTurrStuck = checked
        break;
      case 'conTurrHydrOut':
        newNose.conTurrHydrOut = checked
        break;
      case 'emmerElecOut':
        newNose.emmerElecOut = checked
        break;
      case 'emmerPowerOut':
        newNose.emmerPowerOut = checked
        break;
      case 'navEquipInop':
        newNose.navEquipInop = checked
        break;
      case 'bombCtrlInop':
        newNose.bombCtrlInop = checked
        break;
      case 'bombHeatOut':
        newNose.bombHeatOut = checked
        break;
      case 'navHeatOut':
        newNose.navHeatOut = checked
        break;
      case 'nGunHeatOut':
        newNose.nGunHeatOut = checked
        break;
      case 'bombO2Out':
        newNose.bombO2Out = checked
        break;
      case 'navO2Out':
        newNose.navO2Out = checked
        break;
      case 'nGunO2Out':
        newNose.nGunO2Out = checked
        break;
      default:
        break;
    }
    setNoseB24J(newNose);
    ctx.setNoseB24J(newNose);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Nose Compartment</h3></div></Col>
      <Col span={12}><Checkbox onChange={onChange} checked={ctx?.noseB24J.sightOutt} name='sightOut'>Norden Bomb Sight Out</Checkbox></Col>
      <Col span={12}><Checkbox onChange={onChange} checked={ctx?.noseB24J.noseGunInop} name='noseGunInop'>Nose Gun Inoperable</Checkbox></Col>
      {ctx.noseTurret === 'Consolidated Nose Turret' ?
        <>
        <Col span={10}>Consolidated Turrret:</Col>
          <Col span={5}><Checkbox onChange={onChange} checked={ctx?.noseB24J.conTurrStuck} name='conTurrStuck'>Stuck</Checkbox></Col>
          <Col span={9}><Checkbox onChange={onChange} checked={ctx?.noseB24J.conTurrHydrOut} name='conTurrHydrOut'>Hydraulics Out</Checkbox></Col></>
        : <>
          <Col span={8}>Emmerson Turrret:</Col>
          <Col span={8}><Checkbox onChange={onChange} checked={ctx?.noseB24J.emmerElecOut} name='emmerElecOut'>Electic Out</Checkbox></Col>
          <Col span={8}><Checkbox onChange={onChange} checked={ctx?.noseB24J.emmerPowerOut} name='emmerPowerOut'>Power Out</Checkbox></Col>
        </>
      }
      <Col span={24}><Checkbox onChange={onChange} checked={ctx?.noseB24J.navEquipInop} name='navEquipInop'>Navigator Equipment Inoperable</Checkbox></Col>
      <Col span={24}><Checkbox onChange={onChange} checked={ctx?.noseB24J.bombCtrlInop} name='bombCtrlInop'>Bombardier Controls Inoperable</Checkbox></Col>
      <Col span={4}>Heat Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.noseB24J.bombHeatOut} name='bombHeatOut'>Bombardier</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.noseB24J.navHeatOut} name='navHeatOut'>Navigator</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.noseB24J.nGunHeatOut} name='nGunHeatOut'>Nose Gunner</Checkbox></Col>
      <Col span={5}>Oxygen Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.noseB24J.bombO2Out} name='bombO2Out'>Bombardier</Checkbox></Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.noseB24J.navO2Out} name='navO2Out'>Navigator</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.noseB24J.nGunO2Out} name='nGunO2Out'>Nose Gunner</Checkbox></Col>
    </Row>
  </div>
}

export default NoseCompartmentB24J