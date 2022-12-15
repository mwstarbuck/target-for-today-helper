import React, { createContext, useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  radioGunInop: false,
  radioOut: false,
  heatOut: false,
  O2Out: false,
}

const RadioCompartment = () => {
  const ctx = useContext(GameContext);
  // const {pilotComp,setPilotComp} = useContext(GameContext);
  const [radioComp, setRadioComp] = useState(ctx.radioComp || problems)

  useEffect(() => {
    setRadioComp(ctx.radioComp);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newRadioComp = { ...radioComp };
    switch (name) {
      case 'radioGunInop':
        newRadioComp.radioGunInop = checked
        break;
      case 'radioOut':
        newRadioComp.radioOut = checked
        break;
      case 'heatOut':
        newRadioComp.heatOut = checked
        break;
      case 'O2Out':
        newRadioComp.O2Out = checked
        break;
      case 'heatOut':
        newRadioComp.heatOut = checked
        break;
      case 'pilotO2Out':
        newRadioComp.pilotO2Out = checked
        break;
      case 'coPilotO2Out':
        newRadioComp.coPilotO2Out = checked
        break;
      case 'EngO2Out':
        newRadioComp.EngO2Out = checked
        break;
      default:
        break;
    }
    // setPilotComp(newPilotComp);
    setRadioComp(newRadioComp);
    ctx.setRadioComp(newRadioComp);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Radio Compartment</h3></div></Col>
      <Col span={11}><Checkbox onChange={onChange} checked={ctx?.radioComp?.radioGunInop} name='windowFirstHit'>Radio Gun Inoperable</Checkbox></Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.radioComp?.radioOut} name='radioOut'>Radio Out</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.radioComp?.heatOut} name='heatOut'>Heat Out</Checkbox></Col>
      <Col span={24}><Checkbox onChange={onChange} checked={ctx?.radioComp?.O2Out} name='O2Out'>O2 Out</Checkbox></Col>
    </Row>
  </div>
}

export default RadioCompartment