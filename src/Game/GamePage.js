import React, { useState } from 'react';
import { rollDice } from '../Utilities/Utilities';
import { TABLE_2_1 } from '../Data/Tables';
import PreMissionInfo from './PreMissionInfo';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';

const GamePage = () => {
  const [showRoller, setShowRoller] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  }
  const lastStep = () => {
    if (step > 0) {
      if (step === 1) {
        setCampaign(null);
      }
      setStep(step - 1);
    }
  }

  const handleRoll = () => {
    const result = rollDice(6);
    const campaign = (TABLE_2_1.find(c => c.id === result));
    setCampaign(campaign);
  }
  console.log(step)
  return <><h1 style={{ opacity: 0.6 }}>Target for Today Helper</h1>

    {step === 0 && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={nextStep}>Start Game</button>}
    {step > 0 && <PreMissionInfo step={step} action={handleRoll} />}
    {step === 1 && campaign && <span style={{ opacity: 0.6 }}> <h3>CAMPAIGN #: {campaign.campaign}</h3>
      <h4>PERIOD: {campaign.timePeriod}</h4>
      <h4>AIRCRAFT: {campaign.aircraft}</h4>
      <h5>BASING: <span>{campaign.base}</span></h5>
      <h5>MISSIONS: {campaign.missions}</h5> </span>}
    <br />
    {step > 0 && <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><button onClick={nextStep}>Next Step</button><button onClick={lastStep}>Cancel/Go Back</button></div>}
  </>
}

export default GamePage;