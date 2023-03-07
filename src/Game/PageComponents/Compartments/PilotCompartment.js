import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  windowFirstHit: false,
  windowSecondHit: false,
  tTurretInop: false,
  tTurretPowerOut: false,
  heatOut: false,
  pilotO2Out: false,
  coPilotO2Out: false,
  EngO2Out: false,
}

const PilotCompartment = () => {
  const ctx = useContext(GameContext);
  const [pilotComp, setPilotComp] = useState(ctx.pilotComp || problems)

  useEffect(() => {
    setPilotComp(ctx.pilotComp);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newPilotComp = {...pilotComp};
    switch (name) {
      case 'windowFirstHit':
        newPilotComp.windowFirstHit = checked
        break;
      case 'windowSecondHit':
        newPilotComp.windowSecondHit = checked
        break;
      case 'tTurretInop':
        newPilotComp.tTurretInop = checked
        break;
      case 'tTurretPowerOut':
        newPilotComp.tTurretPowerOut = checked
        break;
      case 'heatOut':
        newPilotComp.heatOut = checked
        break;
      case 'pilotO2Out':
        newPilotComp.pilotO2Out = checked
        break;
      case 'coPilotO2Out':
        newPilotComp.coPilotO2Out = checked
        break;
      case 'EngO2Out':
        newPilotComp.EngO2Out = checked
        break;
      default:
        break;
    }
    setPilotComp(newPilotComp);
    ctx.setPilotComp(newPilotComp);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Pilot Compartment</h3></div></Col>
      <Col span={4}>Window:</Col>
      <Col span={5}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.windowFirstHit} name='windowFirstHit'>1st Hit</Checkbox></Col>
      <Col span={15}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.windowSecondHit} name='windowSecondHit'>2nd Hit</Checkbox></Col>
      {(ctx?.bomber === 'B-17F' || ctx?.bomber === 'B-17G' || ctx?.bomber === 'YB-40') && <><Col span={6}>Top Turret:</Col>
        <Col span={8}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.tTurretInop} name='tTurretInop'>Guns Inoperable</Checkbox></Col>
        <Col span={10}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.tTurretPowerOut} name='tTurretPowerOut'>Power Out</Checkbox></Col>
      </>}
      <Col span={24}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.heatOut} name='heatOut'>Heat Out</Checkbox></Col>
      <Col span={6}>Oxygen Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.pilotO2Out} name='pilotO2Out'>Pilot</Checkbox></Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.coPilotO2Out} name='coPilotO2Out'>Co-Pilot</Checkbox></Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.pilotComp?.EngO2Out} name='EngO2Out'>Engineer</Checkbox></Col>
    </Row>
  </div>
}

export default PilotCompartment;