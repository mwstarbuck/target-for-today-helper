import React, { useContext, useState } from 'react';
import {Checkbox, Row, Col} from 'antd';
import GameContext from '../GameContext';

const problems = {
  sight: false,
  noseGun: false,
  leftCheekGun: false,
  rightCheekGun: false,
  bombControls: false,
  navEquipment: false,
  bombHeat: false,
  navHeat: false,
  bombO2: false,
  navO2: false
}

const NoseCompartment = () => {
  const ctx = useContext(GameContext);
  const [nose, setNose] = useState(problems)

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newNose = nose;
    switch (name) {
      case 'sight':
        newNose.sight = checked
        break;
      case 'noseGun':
        newNose.noseGun = checked
        break;
      case 'leftCheekGun':
        newNose.leftCheekGun = checked
        break;
      case 'rightCheekGun':
        newNose.rightCheekGun = checked
        break;
      case 'navEquipment':
        newNose.navEquipment = checked
        break;
      case 'bombControls':
        newNose.bombControls = checked
        break;
      case 'bombHeat':
        newNose.bombHeat = checked
        break;
      case 'navHeat':
        newNose.navHeat = checked
        break;
      case 'bombO2':
        newNose.bombO2 = checked
        break;
      case 'navO2':
        newNose.navO2 = checked
        break;  
      default:
        break;
    }
    setNose(newNose);
    ctx.setNose(newNose);
    console.log(ctx.nose);
  }

  const label = 'Norden Bomb Sight Out';
  return <div style={{ width: 490, minWidth: 490, border: '1px solid black'}}>
    <Row style={{paddingLeft: 5, textAlign: 'left'}}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{textAlign: 'center'}}>Nose Compartment</h3></div></Col>
      <Col span={12}><Checkbox onChange={onChange} name='sight'>Norden Bomb Sight Out</Checkbox></Col>
      <Col span={12}><Checkbox onChange={onChange} name='noseGun'>Nose Gun Inoperable</Checkbox></Col>
      <Col span={9}>Cheek Gun Inoperable:</Col>
      <Col span={4}><Checkbox onChange={onChange} name='leftCheekGun'>Left</Checkbox></Col>
      <Col span={11}><Checkbox onChange={onChange} name='rightCheekGun'>Right</Checkbox></Col>
      <Col span={24}><Checkbox onChange={onChange} name='navEquipment'>Navigator Equipment Inoperable</Checkbox></Col>
      <Col span={24}><Checkbox onChange={onChange} name='bombControls'>Bombardier Controls Inoperable</Checkbox></Col>
      <Col span={4}>Heat Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} name='bombHeat'>Bombardier</Checkbox></Col>
      <Col span={14}><Checkbox onChange={onChange} name='navHeat'>Navigator</Checkbox></Col>
      <Col span={5}>Oxygen Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} name='bombO2'>Bombardier</Checkbox></Col>
      <Col span={13}><Checkbox onChange={onChange} name='navO2'>Navigator</Checkbox></Col>
    </Row>
  </div>
}

export default NoseCompartment