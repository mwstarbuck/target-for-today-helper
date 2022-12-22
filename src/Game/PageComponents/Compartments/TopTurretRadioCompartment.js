import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  tTurrInop: false,
  tTurrElecOut: false,
  tTurrPwrOut: false,
  radioOut: false,
  comsOut: false,
  heatOut: false,
  radioO2Out: false,
  engO2Out: false,
}

const TopTurretRadioCompartment = () => {
  const ctx = useContext(GameContext);
  const [TTRComp, setTTRComp] = useState(ctx.TTRComp || problems)

  useEffect(() => {
    setTTRComp(ctx.TTRComp);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newTTRComp = { ...TTRComp };
    switch (name) {
      case 'tTurrInop':
        newTTRComp.tTurrInop = checked
        break;
      case 'tTurrElecOut':
        newTTRComp.tTurrElecOut = checked
        break;
      case 'tTurrPwrOut':
        newTTRComp.tTurrPwrOut = checked
        break;
      case 'radioOut':
        newTTRComp.radioOut = checked
        break;
      case 'comsOut':
        newTTRComp.comsOut = checked
        break;
      case 'heatOut':
        newTTRComp.heatOut = checked
        break;
      case 'radioO2Out':
        newTTRComp.radioO2Out = checked
        break;
      case 'engO2Out':
        newTTRComp.engO2Out = checked
        break;
      default:
        break;
    }
    setTTRComp(newTTRComp);
    ctx.setTTRComp(newTTRComp);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Top Turret & Radio Room</h3></div></Col>
      <Col offset={3} span={6}><Checkbox onChange={onChange} checked={ctx?.TTRComp.radioOut} name='radioOut'>Radio Out</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.TTRComp.comsOut} name='comsOut'>Intercom Out</Checkbox></Col>
      <Col span={8}><Checkbox onChange={onChange} checked={ctx?.TTRComp.heatOut} name='heatOut'>Heat Out</Checkbox></Col>
      <Col span={5}>Top Turret:</Col>
      <Col span={8}><Checkbox onChange={onChange} checked={ctx?.TTRComp.tTurrInop} name='tTurrInop'>Guns Inoperable</Checkbox></Col>
      <Col span={8}><Checkbox onChange={onChange} checked={ctx?.TTRComp.tTurrElecOut} name='tTurrElecOut'>Electrics Out</Checkbox></Col>
      <Col offset={5} span={19}><Checkbox onChange={onChange} checked={ctx?.TTRComp.tTurrPwrOut} name='tTurrPwrOut'>Power Failed</Checkbox></Col>
      <Col span={5}>Oxygen Out:</Col>
      <Col span={8}><Checkbox onChange={onChange} checked={ctx?.TTRComp.radioO2Out} name='radioO2Out'>Radio Operator</Checkbox></Col>
      <Col span={11}><Checkbox onChange={onChange} checked={ctx?.TTRComp.engO2Out} name='engO2Out'>Engineer</Checkbox></Col>
    </Row>
  </div>
}

export default TopTurretRadioCompartment