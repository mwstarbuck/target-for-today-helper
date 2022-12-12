import React, { useContext, useState } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps, Button, message } from 'antd';
import Select from 'react-select';
import CombatContext from '../../Game/Context/CombatContext';
import GOF from './GOF';
import GOFHits from './GOFHits';
import GOFDamage from './GOFDamage';

const BDFModal = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal } = props;
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const steps = [
    {
      title: 'German Offensive Fire',
      content: <GOF />
    },
    {
      title: 'German Hit Resolution',
      content: <GOFHits />
    },
    {
      title: 'Bomber Damage Resolution',
      content: <GOFDamage />
    },
    {
      title: 'Check for Collision',
      content: 'collison check'
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
      onCancel={handleCancel} width={1300}>

      <Steps
        current={current}
        labelPlacement='vertical'
        onChange={(s) => setCurrent(s)}>
        <Step title='German Offensive Fire'></Step>
        <Step title='German Hit Resolution'></Step>
        <Step title='Bomber Damage Resolution'></Step>
        <Step title='Check for Collision'></Step>
        {/* <Step title='Target Fighters' content={<GFTargeting />} />
        <Step title='Fighter Skill' content={<GFAssignSkill />} /> */}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < 2 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 2 && ( //add a condition to return to step 0 if fighters remain?
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

export default BDFModal;