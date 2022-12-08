import React, { useState, useContext } from 'react';
import { Row, Col, Radio, Button } from 'antd';
import CombatContext from '../../Game/Context/CombatContext';
import BomberGuns from './BomberGuns';


const FighterSkill = ({ activeGuns, setActiveGuns }) => {
  const combatCTX = useContext(CombatContext);
  const waveData = combatCTX.waveData;
  const [skill, setSkill] = useState('average');

  const onSkillChange = (e) => {
    const skill = e.target.value;
    const id = e.target.id;
    // setSkill(skill);
    let tempData = [...waveData];
    tempData[id].skill = skill;
    combatCTX.setWaveData(tempData);
  }

  const onClick = () => {
    let tempData = [...waveData];
    activeGuns?.forEach(g => tempData[g.id].targetedBy.push(g.gun));
    combatCTX.setWaveData(tempData);
  }

  return (<>
    {waveData?.map((f, i) => <div key={i} style={{ width: 450, minWidth: 450, height: 125, border: '1px solid lightgrey', margin: 16, boxShadow: '2px 1px 1px grey', backgroundColor: '#ededed' }}>
      <Row gutter={5} style={{ paddingLeft: 8, marginBottom: -10, marginTop: 6 }}>
        <Col span={6} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{f.type}</p></Col>
        <Col span={18} style={{ borderBottom: '1px solid lightgrey' }}><p style={{ fontSize: 14, fontWeight: 600 }}>{f.angle} {f.level}</p></Col>
        <Col span={24} style={{ marginTop: 5 }}><p style={{ fontSize: 14, fontWeight: 600 }}>Tageted By: {f.guns.map( g => {
          if (g.checked)
            return `${g.gun} | `;
        }
        )}</p></Col>
        <Col span={9}><p style={{ fontSize: 14, fontWeight: 600 }}>Assign Pilot Skill:</p></Col>
        <Col span={15} style={{ paddingRight: 2 }}>
          <Radio.Group name='skill' id={i} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}} onChange={onSkillChange} value={f.skill}>
            <Radio id={i} value={'green'}>Green</Radio>
            <Radio id={i} value={'average'}>Average</Radio>
            <Radio id={i} value={'ace'}>Ace</Radio>
          </Radio.Group>
        </Col>
      </Row>
    </div>
    )}
    {/* </div> */}
    <div style={{ marginLeft: 155, marginBottom: 25 }}><Button onClick={onClick}>Confirm Targets</Button></div>
  </>
  )

}

export default FighterSkill;