import React from 'react';
import { Popover, Row, Col } from 'antd';
import TargetFighters from './TargetFighters';

const GFTargeting = (props) => {
  const { opacity } = props;

  return <>
    <Row>
      <Col span={24}>
        <TargetFighters />
      </Col>
    </Row>
  </>
}

export default GFTargeting;