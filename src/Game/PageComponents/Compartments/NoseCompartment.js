import React, { useContext, useState, useEffect } from 'react';
import {Checkbox, Row, Col} from 'antd';
import GameContext from '../../GameContext';

const problems = {
  sightOut: false,
  noseGunInop: false,
  LChkGunInop: false,
  RChkGunInop: false,
  bombCtrlInop: false,
  navEquipInop: false,
  bombHeatOut: false,
  navHeatOut: false,
  bombO2Out: false,
  navO2Out: false
}

const NoseCompartment = () => {
  const ctx = useContext(GameContext);
  const [nose, setNose] = useState(ctx.nose || problems)

  useEffect(() => {
    setNose(ctx.nose);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newNose = {...nose};
    switch (name) {
      case 'sightOut':
        newNose.sightOut = checked
        break;
      case 'noseGunInop':
        newNose.noseGunInop = checked
        break;
      case 'LChkGunInop':
        newNose.LChkGunInop = checked
        break;
      case 'RChkGunInop':
        newNose.RChkGunInop = checked
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
      case 'bombO2Out':
        newNose.bombO2Out = checked
        break;
      case 'navO2Out':
        newNose.navO2Out = checked
        break;  
      default:
        break;
    }
    setNose(newNose);
    ctx.setNose(newNose);
  }

  const label = 'Norden Bomb Sight Out';
  return <div style={{ width: 490, minWidth: 490, border: '1px solid black'}}>
    <Row style={{paddingLeft: 5, textAlign: 'left'}}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Nose Compartment</h3></div></Col>
      <Col span={12}><Checkbox onChange={onChange} checked={ctx?.nose.sightOut} name='sightOut'>Norden Bomb Sight Out</Checkbox></Col>
      <Col span={12}><Checkbox onChange={onChange} checked={ctx?.nose.noseGunInop} name='noseGunInop'>{ctx.bomber === 'B-17F' ? `Nose Gun Inoperable` : `Chin Guns Inoperable`}</Checkbox></Col>
      <Col span={9}>Cheek Gun Inoperable:</Col>
      <Col span={4}><Checkbox onChange={onChange} checked={ctx?.nose.LChkGunInop} name='LChkGunInop'>Left</Checkbox></Col>
      <Col span={11}><Checkbox onChange={onChange} checked={ctx?.nose.RChkGunInop} name='RChkGunInop'>Right</Checkbox></Col>
      <Col span={24}><Checkbox onChange={onChange} checked={ctx?.nose.navEquipInop} name='navEquipInop'>Navigator Equipment Inoperable</Checkbox></Col>
      <Col span={24}><Checkbox onChange={onChange} checked={ctx?.nose.bombCtrlInop} name='bombCtrlInop'>Bombardier Controls Inoperable</Checkbox></Col>
      <Col span={4}>Heat Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.nose.bombHeatOut} name='bombHeatOut'>Bombardier</Checkbox></Col>
      <Col span={14}><Checkbox onChange={onChange} checked={ctx?.nose.navHeatOut} name='navHeatOut'>Navigator</Checkbox></Col>
      <Col span={5}>Oxygen Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.nose.bombO2Out} name='bombO2Out'>Bombardier</Checkbox></Col>
      <Col span={13}><Checkbox onChange={onChange} checked={ctx?.nose.navO2Out} name='navO2Out'>Navigator</Checkbox></Col>
    </Row>
  </div>
}

export default NoseCompartment