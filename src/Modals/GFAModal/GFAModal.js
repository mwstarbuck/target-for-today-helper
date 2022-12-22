import React, { useContext, useEffect, useState } from 'react';
import { Modal, Popover, Divider, Row, Col, Steps, Button, message } from 'antd';
import Select from 'react-select';
import GameContext from '../../Game/GameContext';
import CombatContext from '../../Game/Context/CombatContext';
import EnterGFNumber from './EnterGFNumber';
import GFA from './GFA';
import GFDrivenOff from './GFDrivenOff';
import GFTargeting from './GFTargeting';
import GFAssignSkill from './GFAssignSkill';
import { createGunList } from './GFHelpers';

const GFAModal = (props) => {
  const ctx = useContext(GameContext);
  const combatCTX = useContext(CombatContext);
  const round = ctx.round;
  const { showModal, setShowModal, source, opacity } = props;
  const [current, setCurrent] = useState(0);
  const {Step} = Steps;
  const steps1 = [
    {
      title: 'German Fighter Appearance',
      content: <GFA source={source} opacity={0.9} />,
    },
    {
      title: 'Number GF Driven Off',
      content: <GFDrivenOff />
    },
    {
      title: 'Target Fighter',
      content: <GFTargeting current={current} />
    },
    {
      title: 'Fighter Skill',
      content: <GFAssignSkill current={current} />
    },
  ];

  const steps = [
    {
      title: 'German Fighter Appearance',
      content: <GFA source={source} opacity={0.9} />,
    },
    {
      title: 'Target Fighter',
      content: <GFTargeting current={current} />
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  }

  const onDone = () => {
    setShowModal(false);
    setCurrent(0);
  }

  const handleOk = () => {
    setShowModal(false);
    setCurrent(0);
  };
  const handleCancel = () => {
    setShowModal(false);
    setCurrent(0);
  };

  useEffect(() => {
    combatCTX.setActiveGuns([]);
    if(current === 2 && round === 1) {
      const newD = [...combatCTX.waveData]
      newD.map(f => {
        const guns = createGunList(ctx, f)
        f.guns = guns;
      })
      combatCTX.setWaveData(newD);
    }
    else if (current === 1 && round > 1){
      const newD = [...combatCTX.waveData]
      newD.map(f => {
        const guns = createGunList(ctx, f)
        f.guns = guns;
      })
      combatCTX.setWaveData(newD);
    }
  },[current])

  return <>
    <Modal
      open={showModal}
      onOk={handleOk}
      onCancel={handleCancel} width={1200}>
        
      <Steps 
        current={current}
        labelPlacement='vertical'
        onChange={(s) => setCurrent(s)}>
        {round === 1 ? <>
        <Step title='Fighter Appearance' content={<GFA source={source} opacity={0.9} />} />
        <Step title='Number GF Driven Off' content={<GFDrivenOff />}/>
        <Step title='Target Fighters' content={<GFTargeting />} />
        <Step title='Fighter Skill' content={<GFAssignSkill />} />
        </> : 
          <>
            <Step title='Fighter Appearance' content={<GFA source={source} opacity={0.9} />} />
            <Step title='Target Fighters' content={<GFTargeting />} />
          </>}
      </Steps>
      <div className="steps-content">{round === 1 ? steps1[current].content : steps[current].content}</div>
      <div className="steps-action">
        {current < ((round === 1) ? 3 : 1) && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === ((round === 1) ? 3 : 1) && (
          <Button type="primary" onClick={() => onDone()}>
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