import React, { useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  LWstGunInop: false,
  RWstGunInop: false,
  ballInop: false,
  ballMechInop: false,
  ballPwrOut: false,
  ballElecOut: false,
  ballAuxHydrOut: false,
  LHeatOut: false,
  RHeatOut: false,
  ballHeatOut: false,
  LO2Out: false,
  RO2Out: false,
  ballO2Out: false,
}

const WaistCompartment = () => {
  const ctx = useContext(GameContext);
  const [waistComp, setWaistComp] = useState(ctx.waistComp || problems)

  useEffect(() => {
    setWaistComp(ctx.waistComp);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newWaistComp = { ...waistComp };
    switch (name) {
      case 'LWstGunInop':
        newWaistComp.LWstGunInop = checked
        break;
      case 'RWstGunInop':
        newWaistComp.RWstGunInop = checked
        break;
      case 'ballInop':
        newWaistComp.ballInop = checked
        break;
      case 'ballMechInop':
        newWaistComp.ballMechInop = checked
        break;
      case 'ballPwrOut':
        newWaistComp.ballPwrOut = checked
        break;
      case 'ballElecOut':
        newWaistComp.ballElecOut = checked
        break;
      case 'ballAuxHydrOut':
        newWaistComp.ballAuxHydrOut = checked
        break;
      case 'LHeatOut':
        newWaistComp.LHeatOut = checked
        break;
      case 'RHeatOut':
        newWaistComp.RHeatOut = checked
        break;
      case 'ballHeatOut':
        newWaistComp.ballHeatOut = checked
        break;
      case 'LO2Out':
        newWaistComp.LO2Out = checked
        break;
      case 'RO2Out':
        newWaistComp.RO2Out = checked
        break;
      case 'ballO2Out':
        newWaistComp.ballO2Out = checked
        break;
      default:
        break;
    }
    setWaistComp(newWaistComp);
    ctx.setWaistComp(newWaistComp);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Waist Compartment</h3></div></Col>
      <Col span={10}>Waist Gun Inoperable:</Col>
      <Col span={4}><Checkbox onChange={onChange} checked={ctx?.waistComp?.LWstGunInop} name='LWstGunInop'>Left</Checkbox></Col>
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.waistComp?.windowSecondHit} name='windowSecondHit'>Right</Checkbox></Col>
      <Col span={6}>Ball Turret:</Col>
      <Col span={8}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballInop} name='ballInop'>Guns Inoperable</Checkbox></Col>
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballMechInop} name='ballMechInop'>Mechanism Inoperable</Checkbox></Col>
      {(ctx.bomber === 'B-24D' || ctx.bomber === 'B-24J') &&
        <>
          <Col offset={6} span={8}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballElecOut} name='ballElecOut'>Electrics Out</Checkbox>
          </Col>
          <Col span={10}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballAuxHydrOut} name='ballAuxHydrOut'> Aux Hydraulics Out</Checkbox>
          </Col>
        </>}
      <Col offset={6} span={24}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballPwrOut} name='ballPwrOut'>Power Failed</Checkbox></Col>

      <Col span={3}>Heat:</Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.waistComp?.LHeatOut} name='LHeatOut'>Left Gunner</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.waistComp?.RHeatOut} name='RHeatOut'>Right Gunner</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballHeatOut} name='ballHeatOut'>Ball Gunner</Checkbox></Col>
      <Col span={3}>O2:</Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.waistComp?.LO2Out} name='LO2Out'>Left Gunner</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.waistComp?.RO2Out} name='RO2Out'>Right Gunner</Checkbox></Col>
      <Col span={7}><Checkbox onChange={onChange} checked={ctx?.waistComp?.ballO2Out} name='ballO2Out'>Ball Gunner</Checkbox></Col>
    </Row>
  </div>
}

export default WaistCompartment