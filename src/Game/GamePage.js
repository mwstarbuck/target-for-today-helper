import React, { useState, useContext } from 'react';
import { rollDice } from '../Utilities/Utilities';
import { TABLE_2_1 } from '../Data/Tables';
import PreMissionInfo from './PreMissionInfo';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';
import { actionEnum } from '../Utilities/Utilities';
import { GameContext } from './GameContext';

const GamePage = () => {
  const ctx = useContext(GameContext);
  const [showRoller, setShowRoller] = useState(false);
  const [step, setStep] = useState(0);
  let weather = 69;

  const nextStep = () => {
    setStep(step + 1);
  }
  const lastStep = () => {
    if (step > 0) {
      if (step === 1) {
        ctx.setCampaign(null);
      }
      setStep(step - 1);
    }
  }

  const handleRoll = () => {
    const result = rollDice(6);
    const campaign = (TABLE_2_1.find(c => c.id === result));
    // setCampaign(campaign);
    ctx.setCampaign(campaign);
  }
  console.log(ctx.campaign)
  return <>
    <h1 style={{ opacity: 0.6 }}>Target for Today Helper</h1>

    {step === 0 && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={nextStep}>Start Game</button>}
    {step > 0 && <div className='row'>
      <div className='column'>
        Campaign Info
        {step >= 1 && ctx.campaign && <span style={{ opacity: 0.6 }}> <h3>CAMPAIGN #: {ctx.campaign?.campaign}</h3>
          <h4>PERIOD: {ctx.campaign?.timePeriod}</h4>
          <h4>AIRCRAFT: {ctx.campaign?.aircraft}</h4>
          <h5>BASING: <span>{ctx.campaign?.base}</span></h5>
          <h5>MISSIONS: {ctx.campaign?.missions}</h5> </span>}
      </div>
      <div className='column'>
        {/* {step === 1 && <button onClick={() => { actionEnum['campaignRoll'](ctx.setCampaign); nextStep(); }}>Roll for Campaign</button>} */}
        {step >= 1 && <PreMissionInfo
          step={step} />}
        {step > 1 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><button onClick={nextStep}>Next Step</button><button onClick={lastStep}>Cancel/Go Back</button></div>}
      </div>
      <div className='column'>Bomber Card</div>
    </div>}
  </>
}

export default GamePage;