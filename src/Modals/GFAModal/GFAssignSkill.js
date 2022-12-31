import React, { useState } from 'react';
import { Popover, Row, Col } from 'antd';
import FighterSkill from './FighterSkill';

const GFAssignSkill = (props) => {
  const { opacity } = props;

  return <>
    <Row>
      <Col span={12}>
        <FighterSkill />
      </Col>
      <Col span={12}>
        <div>
          <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>German Fighter Skill</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 1D6)</p></div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>German Fighter Skill Notes</div><img src={require('../../Images/TableNotes/5-5A-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
          </Popover>
          <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-5A.png')} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
        </div>
      </Col>
    </Row>
  </>
}

export default GFAssignSkill;