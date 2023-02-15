import React from 'react';
import { Card, Row, Col, Divider } from 'antd';

const CrewCard = ({ crewman }) => {
  return <Card
    title={<Row gutter={[8, 8]}>
      <Col span={7}><h4 style={{ fontWeight: 600 }}>{crewman.position}</h4></Col>
      <Col><p>Name: {crewman.name}</p></Col>

      {/* <Col span={3}><p>Age: {crewman.age}</p></Col>
      <Col span={5}><p>State: {crewman.state}</p></Col> */}
    </Row>}
    // title={<><h3 style={{fontWeight: 600}}>{crewman.position}</h3> <p>Name: {crewman.name}</p></>}
    headStyle={{ textAlign: 'left' }}
    size='small'
    extra={<a>Recruit</a>}
  >
    <Row>
      <Col>
        <Col><p>Age: {crewman.age}</p></Col>
        <Col><p>State: {crewman.state}</p></Col>
        <Col><p>Missions Flown: {crewman.missions}</p></Col>
      </Col>
      <Col span={12}>
        <Col span={24}><p>Status: {crewman.status}</p></Col>
        <Col span={24}><p>Location: {crewman.location}</p></Col>
      </Col>
    </Row>
  </Card>
}

export default CrewCard;
