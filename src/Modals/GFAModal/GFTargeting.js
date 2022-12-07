import React, { useState } from 'react';
import { Popover, Row, Col } from 'antd';
import TargetFighters from './TargetFighters';

const GFTargeting = (props) => {
  const { opacity } = props;
  const [activeGuns, setActiveGuns] = useState([]);

  return <>
    <Row>
      <Col span={24}>
        <TargetFighters activeGuns={activeGuns} setActiveGuns={setActiveGuns} />
      </Col>
    </Row>
  </>
}

export default GFTargeting;