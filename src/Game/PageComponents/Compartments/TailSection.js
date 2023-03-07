import React, { createContext, useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  tailGunsInop: false,
  tailTurrInop: false,
  auxHydrOut: false,
  powerOut: false,
  heatOut: false,
  O2Out: false
}

const TailSection = () => {
  const ctx = useContext(GameContext);
  const [tailSection, setTailSection] = useState(ctx.setTailSection || problems)

  useEffect(() => {
    setTailSection(ctx.tailSection);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newTailSection = { ...tailSection };
    switch (name) {
      case 'tailGunsInop':
        newTailSection.tailGunsInop = checked
        break;
      case 'tailTurrInop':
        newTailSection.tailTurrInop = checked
        break;
      case 'auxHydrOut':
        newTailSection.auxHydrOut = checked
        break;
      case 'powerOut':
        newTailSection.powerOut = checked
        break;
      case 'heatOut':
        newTailSection.heatOut = checked
        break;
      case 'O2Out':
        newTailSection.O2Out = checked
        break;
      default:
        break;
    }
    setTailSection(newTailSection);
    ctx.setTailSection(newTailSection);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Tail Section</h3></div></Col>
      {(ctx?.bomber === 'B-17F' || ctx?.bomber === 'B-17G' || ctx?.bomber === 'YB-40') ?
        <Col span={10}>
          <Checkbox onChange={onChange} checked={ctx?.tailSection?.tailGunsInop} name='tailGunsInop'>
            Tail Guns Inoperable</Checkbox>
        </Col> :
        <>
          <Col span={6}>Tail Turret:</Col>
          <Col span={10}>
            <Checkbox onChange={onChange} checked={ctx?.tailSection?.tailTurrInop} name='tailTurrInop'>Guns Inoperable</Checkbox>
          </Col>
          <Col span={7}>
            <Checkbox onChange={onChange} checked={ctx?.tailSection?.powerOut} name='powerOut'>Power Failed</Checkbox>
          </Col>
          <Col offset={6} span={12}>
            <Checkbox onChange={onChange} checked={ctx?.tailSection?.auxHydrOut} name='auxHydrOut'>Auxiliary Hydraulics Out</Checkbox>
          </Col>
        </>}
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.tailSection?.heatOut} name='heatOut'>Heat Out</Checkbox></Col>
      <Col offset={1} span={23}><Checkbox onChange={onChange} checked={ctx?.tailSection?.O2Out} name='O2Out'>Oxygen Out</Checkbox></Col>
    </Row>
  </div>
}

export default TailSection;