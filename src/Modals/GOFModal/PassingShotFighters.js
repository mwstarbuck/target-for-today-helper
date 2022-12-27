import React, { useContext, useState, useEffect, useMemo } from 'react';
import { Popover, Row, Col, Radio } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';
import PassingShotFighter from './PassingShotFighter';

const PassingShotFighters = ({ fId }) => {
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData;
  const [checked, setChecked] = useState(combatCTX?.targetedFighter?.id);

  const onSelect = (e) => {
    const type = e.target.id;
    const id = e.target.value;
    setChecked(id);
    const targetedFighter = waveData[id];
    combatCTX.setTargetedFighter(targetedFighter);
  }

  console.log(combatCTX.targetedFighter);
  console.log(combatCTX.waveData);
  return <>
    <Row>
      <Col span={24}>
        {/* <TargetFighters activeGuns={activeGuns} setActiveGuns={setActiveGuns} /> */}
        <Radio.Group name='fighter' defaultValue={fId} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', paddingTop: 8, paddingLeft: 8 }}>
          {waveData.map((f, i) => (
            <Radio key={i} isChecked={f.id === fId} value={f.id} id={f.type} name={f.type} onChange={onSelect}><PassingShotFighter
              id={i}
              type={f.type}
              skill={f.skill}
              status={f.status}
              angle={f.angle}
              level={f.level}
              guns={f.guns}
            /></Radio>))}

          {/* <Radio value={'FCA'}>FCA</Radio>
          <Radio value={'2 FCA'}>2FCA</Radio>
          <Radio value={'FBOA'}>FBOA</Radio>
          <Radio value={'FCAB'}>FCAB</Radio> */}
        </Radio.Group>
      </Col>
    </Row>
  </>
}

export default PassingShotFighters;