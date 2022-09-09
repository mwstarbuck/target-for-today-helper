import React, { useState } from 'react';
import { rollDice } from '../Utilities/Utilities';
import { TABLE_2_1 } from '../Data/Tables';

const GamePage = () => {
  const [showRoller, setShowRoller] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [step, setStep] = useState(0);

  const handleRoll = () => {
    const result = rollDice(6);
    const campaign = (TABLE_2_1.find(c => c.id === result));
    setCampaign(campaign);
  }
  console.log(step)
  return <><h1 style={{ opacity: 0.7 }}>Target for Today Helper</h1>

    {!showRoller && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={() => setShowRoller(!showRoller)}>Start Game</button>}
    {showRoller && <button style={{ fontFamily: 'Courier' }} onClick={handleRoll}>Roll for campaign</button>}

    {campaign && <span style={{ opacity: 0.7 }}> <h3>CAMPAIGN #: {campaign.campaign}</h3>
      <h4>PERIOD: {campaign.timePeriod}</h4>
      <h4>AIRCRAFT: {campaign.aircraft}</h4>
      <h5>BASING: <span style={{ textDecoration: 'underline' }}>{campaign.base}</span></h5>
      <h5>MISSIONS: {campaign.missions}</h5>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}><button onClick={() => setStep(step + 1)}>Next Step</button><button onClick={() => setStep(step - 1)}>Cancel/Go Back</button></div></span>}
  </>
}

export default GamePage;