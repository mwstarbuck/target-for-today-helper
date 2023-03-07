import React, { createContext, useContext, useState, useEffect } from 'react';
import { Checkbox, Row, Col } from 'antd';
import GameContext from '../../GameContext';

const problems = {
  firstHit: false,
  secondHit: false,
}

const ControlCables = () => {
  const ctx = useContext(GameContext);
  const [controlCables, setControlCables] = useState(ctx.controlCables || problems)

  useEffect(() => {
    setControlCables(ctx.controlCables);
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;
    let newControlCables = { ...controlCables };
    switch (name) {
      case 'firstHit':
        newControlCables.firstHit = checked
        break;
      case 'secondHit':
        newControlCables.secondHit = checked
        break;
      default:
        break;
    }
    setControlCables(newControlCables);
    ctx.setControlCables(newControlCables);
  }

  return <div style={{ width: 490, minWidth: 490, border: '1px solid black' }}>
    <Row style={{ paddingLeft: 5, textAlign: 'left' }}>
      <Col span={24}><div style={{ backgroundColor: 'rgb(226, 212, 201)', marginLeft: -5, borderBottom: '1px solid black' }}><h3 style={{ textAlign: 'center', margin: 0 }}>Control Cables</h3></div></Col>
      <Col span={8}>Control Cables:</Col>
      <Col span={6}><Checkbox onChange={onChange} checked={ctx?.controlCables?.firstHit} name='firstHit'>First Hit</Checkbox></Col>
      <Col span={10}><Checkbox onChange={onChange} checked={ctx?.controlCables?.secondHit} name='secondHit'>Second Hit</Checkbox></Col>
    </Row>
  </div>
}

export default ControlCables;