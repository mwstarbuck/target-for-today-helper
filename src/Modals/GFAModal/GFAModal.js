import React, { useContext, useState } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps, Button, message } from 'antd';
import Select from 'react-select';
// import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import EnterGFNumber from './EnterGFNumber';
import GFA from './GFA';
import GFDrivenOff from './GFDrivenOff';
import GFTargeting from './GFTargeting';


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
      content: <GFTargeting current={current} />
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
        
      <Steps 
        current={current}
        labelPlacement='vertical'
        onChange={(s) => setCurrent(s)}>
        <Step title='Fighter Appearance' content={<GFA source={source} opacity={0.9} />} />
        <Step title='Number GF Driven Off' content={<GFDrivenOff />}/>
        <Step title='Target Fighters' content={<GFTargeting />} />
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
    </Modal>
  </>
}

export default GFAModal;