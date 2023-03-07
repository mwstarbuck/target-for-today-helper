import React, { createContext, useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  LBrakeOut: false,
  RBrakeOut: false,
  LGearOut: false,
  RGearOut: false,
  tailWheelDamged: false,
  noseWheelDamged: false,
}

const LandingGear = () => {
  const ctx = useContext(GameContext);
  const [landingGear, setLandingGear] = useState(ctx.landingGear || problems)

  useEffect(() => {
    setLandingGear(ctx.landingGear);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newLandingGear = { ...landingGear };
    switch (name) {
      case 'LBrakeOut':
        newLandingGear.LBrakeOut = checked
        break;
      case 'RBrakeOut':
        newLandingGear.RBrakeOut = checked
        break;
      case 'LGearOut':
        newLandingGear.LGearOut = checked
        break;
      case 'RGearOut':
        newLandingGear.RGearOut = checked
        break;
      case 'tailWheelDamged':
        newLandingGear.tailWheelDamged = checked
        break;
      case 'noseWheelDamged':
        newLandingGear.noseWheelDamged = checked
        break;
      default:
        break;
    }
    setLandingGear(newLandingGear);
    ctx.setLandingGear(newLandingGear);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Control Cables</h3></div></Col>
      <Col span={8}>Brakes Out:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.landingGear?.LBrakeOut} name='LBrakeOut'>Left</Checkbox></Col>
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.landingGear?.RBrakeOut} name='RBrakeOut'>Right</Checkbox></Col>
      <Col span={8}>Gear Inoperable:</Col>
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.landingGear?.LGearOut} name='LGearOut'>Left</Checkbox></Col>
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.landingGear?.RGearOut} name='RGearOut'>Right</Checkbox></Col>
      {(ctx?.bomber === 'B-17F' || ctx?.bomber === 'B-17G' || ctx?.bomber === 'YB-40') ? <Col span={10}><Checkbox onChange={onChange} checked={ctx?.landingGear?.tailWheelDamged} name='tailWheelDamged'>Tail Wheel Damaged</Checkbox></Col> :
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.landingGear?.noseWheelDamged} name='noseWheelDamged'>Nose Wheel Damaged</Checkbox></Col>}
    </Row>
  </div>
}

export default LandingGear;