import React, { useContext, useState } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps, Button, message } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import EnterGFNumber from './EnterGFNumber';
import GFA from './GFA';
import GFDrivenOff from './GFDrivenOff';

const GFAModal = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal, source, opacity } = props;
  const [current, setCurrent] = useState(0);
  const {Step} = Steps;
  const steps = [
    {
      title: 'German Fighter Appearance',
      content: <GFA source={source} opacity={0.9} />
    },
    {
      title: 'Number GF Driven Off',
      content: <GFDrivenOff />
    },
    {
      title: 'Target Fighters',
      content: 'Content 3'
    },
    {
      title: 'Fighter Skill',
      content: 'Content 4'
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  }

  const handleOk = () => {
    // setZonesInfo(zonesData);
    // ctx.setTargetZone(zonesData[zonesData.length - 1].zone);
    // combatCTX.setWaveData(waveData);
    setShowModal(false);
  };
  const handleCancel = () => {
    setShowModal(false);
  };

const items = steps.map((item) => ({
  key: item.title,
  title: item.title
}))

  return <>
    <Modal
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel} width={1200}>
        
      {/* <Steps current={current} items={items} /> */}
      <Steps 
        current={current}
        labelPlacement='vertical'
        onChange={(s) => setCurrent(s)}>
        <Step title='Fighter Appearance' content={<GFA source={source} opacity={0.9} />} />
        <Step title='Number GF Driven Off' content={<GFDrivenOff />}/>
        <Step title='Target Fighters'>Content 3</Step>
        <Step title='Fighter Skill'>Content 4</Step>
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < 3 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 3 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: '0 8px',
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
      {/* <Row>
        <Col span={10}>
          <EnterGFNumber setShowModal={setShowModal} />
        </Col>
        <Col span={14}>
          {source.map((t, i) => (
            <div key={i}>
              <div style={{ textAlign: 'center', marginBottom: -20 }}><p style={{ fontSize: 19, fontWeight: 600 }}>{t.title}</p>{t.diceType && <p style={{ fontSize: 16, fontWeight: 600 }}>(Roll {t.diceType})</p>}</div>
              <Popover trigger='click' placement='left' content={<><div style={{ fontWeight: 600, fontSize: 18 }}>{t.title} Notes</div><img src={t.note} style={{ opacity: 0.8, paddingTop: 10, alignSelf: 'baseline' }} /></>} ><a style={{ cursor: 'pointer', textAlign: 'right' }}>See Table Notes</a>
              </Popover>
              <div style={{ alignItems: 'center' }}><img src={t.table} style={{ opacity: opacity || 0.6, paddingTop: 10, alignSelf: 'baseline' }} /></div>
              {i < source.length - 1 && < Divider />}
            </div>)
          )}
        </Col>
      </Row> */}
    </Modal>
  </>
}

export default GFAModal;