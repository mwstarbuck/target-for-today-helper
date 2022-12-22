import React, { createContext, useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  releaseMechOut: false,
  raftsDestroyed: false,
  doorsInop: false,
  fuelTranPumpInop: false,
  hydrPumpOut: false
}

const BombBay = () => {
  const ctx = useContext(GameContext);
  // const {pilotComp,setPilotComp} = useContext(GameContext);
  const [bombBay, setBombBay] = useState(ctx.bombBay || problems)

  useEffect(() => {
    setBombBay(ctx.bombBay);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newBombBay = { ...bombBay };
    switch (name) {
      case 'releaseMechOut':
        newBombBay.releaseMechOut = checked
        break;
      case 'raftsDestroyed':
        newBombBay.raftsDestroyed = checked
        break;
      case 'doorsInop':
        newBombBay.doorsInop = checked
        break;
      case 'fuelTranPumpInop':
        newBombBay.fuelTranPumpInop = checked
        break;
      case 'hydrPumpOut':
        newBombBay.hydrPumpOut = checked
        break;
      default:
        break;
    }
    // setPilotComp(newPilotComp);
    setBombBay(newBombBay);
    ctx.setBombBay(newBombBay);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Bomb Bay</h3></div></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.bombBay?.releaseMechOut} name='releaseMechOut'>Bomb Release Mechanism Out</Checkbox></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.bombBay?.raftsDestroyed} name='raftsDestroyed'>Rubber Rafts Destroyed</Checkbox></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.bombBay?.doorsInop} name='doorsInop'>Bomb Bay Doors Inoperable</Checkbox></Col>
      {(ctx?.bomber === 'B-17F' || ctx?.bomber === 'B-17G' || ctx?.bomber === 'YB-40') ? <Col span={24}><Checkbox onChange={onChange} checked={ctx?.bombBay?.fuelTranPumpInop} name='fuelTranPumpInop'>Fuel Transfer Pump Inoperable</Checkbox></Col> :
        <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.bombBay?.hydrPumpOut} name='hydrPumpOut'>Backup Hydraulic Pump Out</Checkbox></Col>}
    </Row>
  </div>
}

export default BombBay;