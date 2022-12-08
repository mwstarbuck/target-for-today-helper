import React, { useState } from 'react';
import { Popover, Row, Col } from 'antd';
import FighterSkill from './FighterSkill';

const GFAssignSkill = (props) => {
  const { opacity } = props;

  return <>
    <Row>
      <Col span={24}>
        <FighterSkill />
      </Col>
    </Row>
  </>
}

export default GFAssignSkill;