import React, { useState } from 'react';
import { rollDice } from '../Utilities/Utilities';
import { TABLE_2_1 } from '../Data/Tables';
import { tab } from '@testing-library/user-event/dist/tab';

const GamePage = () => {
  const [showRoller, setShowRoller] = useState(false);
  const [campaign, setCampaign] = useState(null);

  const handleRoll = () => {
    const result = rollDice(6);
    const campaign = (TABLE_2_1.find(c => c.id === result));
    setCampaign(campaign);
  }
  console.log(campaign);
  return <><h1>Target for Today Helper</h1>

    {!showRoller && <button onClick={() => setShowRoller(!showRoller)}>Start Game</button>}
    {showRoller && <button onClick={handleRoll}>Roll for campaign</button>}

    {campaign && <> <h3>{campaign.campaign}</h3>
      <h4>Period: {campaign.timePeriod}</h4>
      <h4>Aircraft: {campaign.aircraft}</h4>
      <h5>Basing: {campaign.base}</h5>
      <h5>Missions: {campaign.missions}</h5> </>}
  </>
}

export default GamePage;