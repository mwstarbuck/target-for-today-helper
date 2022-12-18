import React, { createContext, useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  O2SysOut: false,
  ElecSysOut: false,
  propSystemOut: false,
  fuelSysOut: false,
  engineFireExtOut: false,
  autoPilotOut: false,
  comsSysOut: false,
}

const Systems = () => {
  const ctx = useContext(GameContext);
  // const {pilotComp,setPilotComp} = useContext(GameContext);
  const [systems, setSystems] = useState(ctx.systems || problems)

  useEffect(() => {
    setSystems(ctx.systems);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newSystems = { ...systems };
    switch (name) {
      case 'O2SysOut':
        newSystems.O2SysOut = checked
        break;
      case 'ElecSysOut':
        newSystems.ElecSysOut = checked
        break;
      case 'propSystemOut':
        newSystems.propSystemOut = checked
        break;
      case 'fuelSysOut':
        newSystems.fuelSysOut = checked
        break;
      case 'engineFireExtOut':
        newSystems.engineFireExtOut = checked
        break;
      case 'autoPilotOut':
        newSystems.autoPilotOut = checked
        break;
      case 'comsSysOut':
        newSystems.comsSysOut = checked
        break;
      default:
        break;
    }
    // setPilotComp(newPilotComp);
    setSystems(newSystems);
    ctx.setSystems(newSystems);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Control Cables</h3></div></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.O2SysOut} name='O2SysOut'>Oxygen System Out</Checkbox></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.ElecSysOut} name='ElecSysOut'>Electrical System Out</Checkbox></Col>
      {(ctx?.bomber === 'B-24D' || ctx?.bomber === 'B-24J') ? <><Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.propSystemOut} name='propSystemOut'>Propeller Feathering System Out</Checkbox></Col>
        <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.fuelSysOut} name='fuelSysOut'>Fuel Transfer System Out</Checkbox></Col>
      </> :
        <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.comsSysOut} name='comsSysOut'>Intercom System Out</Checkbox></Col>}
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.engineFireExtOut} name='engineFireExtOut'>Engine Fire Extinguishers Out</Checkbox></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.systems?.autoPilotOut} name='autoPilotOut'>Autopilot Mechanism Out</Checkbox></Col>
    </Row>
  </div>
}

export default Systems;