import React, { useContext, useState } from 'react';
import { Popover, Divider, Row, Col, Switch} from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import BDFFighters from './BDFFighters';

const BDF = (props) => {
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
        {/* Fighers go herer type, Skill, angle level */}
        {/* Radio to select Gun & radio to enter Status */}
        <BDFFighters />
      </Col>
      <Col span={12}>
        {/* Show table 5-6 use toggle to display spray fire table */}
        {/* Show cumulative modifiers here */}
          <Switch defaultChecked checked={checked} checkedChildren='Fire Table' unCheckedChildren='Spray Fire Table' onChange={onChange} />

          { checked ? <div key='regular'>
          <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-6 Bomber Defensive Fire Resolution</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 2D6)</p></div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-6 Bomber Defensive Fire Resolution Notes</div><img src={require('../../Images/TableNotes/5-6-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
          <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-6.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          </div>
          : 
          <div key='spray'>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>5-6A Area Spray Fire Table (Optional)</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 1D6)</p></div>
            <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>5-6A Area Spray Fire Table (Optional) Notes</div><img src={require('../../Images/TableNotes/5-6A-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
            <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-6A.png')} style={{ opacity: opacity || 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          </div>}
      </Col>
    </Row>
  </>
}

export default BDF;

