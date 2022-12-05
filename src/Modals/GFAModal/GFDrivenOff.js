import React from 'react';
import {  Popover, Row, Col } from 'antd';
import DOFighters from './DOFighter';

const GFDrivenOff = (props) => {
  const { opacity } = props;

  return <>
    <Row>
      <Col span={10}>
        <DOFighters />
      </Col>
      <Col span={14}>
          <div>
            <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>German Fighers Driven Off</p><p style={{ fontSize: 16, fontWeight: 600 }}>(Roll 2D6)</p></div>
          <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>German Fighters Driven Off Notes</div><img src={require('../../Images/TableNotes/5-4-note.png')} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
            </Popover>
            <div style={{ alignItems: 'center' }}><img src={require('../../Images/Tables/5-4.png')} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
          </div>
      </Col>
    </Row>
  </>
}

export default GFDrivenOff;

