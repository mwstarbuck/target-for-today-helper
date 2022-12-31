import React, { useContext, useState } from 'react';
import { Popover, Divider, Row, Col, Switch } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import GOFFighters from './GOFFighters';

const GOFCollision = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;
  const [checked, setChecked] = useState(true);

  const onChange = () => {
    setChecked(!checked);
  }

  return <>
    <Row>
      <Col span={12}>
        <GOFFighters fId={combatCTX?.targetedFighter?.id} />
      </Col>
      <Col span={12}>
        {/* Show cumulative modifiers here */}
        {/* <Switch defaultChecked checked={checked} checkedChildren='Fire Table' unCheckedChildren='Spray Fire Table' onChange={onChange} /> */}

        <div key='regular'>
          <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-16 Collision Table</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 2D6)</p></div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-16 Collision Table Notes</div><img src={require('../../Images/TableNotes/5-16-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
          </Popover>
          <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-16.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
        </div>
      </Col>
    </Row>
  </>
}

export default GOFCollision;

