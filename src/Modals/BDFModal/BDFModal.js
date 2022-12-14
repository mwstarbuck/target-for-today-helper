import React, { useContext, useState } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps, Button, message } from 'antd';
import Select from 'react-select';
import CombatContext from '../../Game/Context/CombatContext';
import BDF from './BDF';
import BDFHits from './BDFHits';

const BDFModal = (props) => {
  // const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const { showModal, setShowModal} = props;
  const [current, setCurrent] = useState(0);
  const { Step } = Steps;
  const steps = [
    {
      title: 'Bomber Defensive Fire',
      content: <BDF />
    },
    {
      title: 'Roll for GF Damage',
      content: <BDFHits />
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
        <Step title='Bomber Defensive Fire'></Step>
        <Step title='Roll for GF Damage'></Step>
        {/* <Step title='Target Fighters' content={<GFTargeting />} />
        <Step title='Fighter Skill' content={<GFAssignSkill />} /> */}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === 1 && ( //add condition to go back to step 0 if fighters remain?
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