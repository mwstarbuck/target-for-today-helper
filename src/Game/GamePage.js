import React, { useState, useContext } from 'react';
import { rollDice, nextStep } from '../Utilities/Utilities';
import { TABLE_2_1 } from '../Data/Tables';
import PreMissionInfo from './PreMissionInfo';
import { PRE_MISSION_STEPS } from '../Data/GameSteps';
import { actionEnum } from '../Utilities/Utilities';
import { GameContext } from './GameContext';
import { Popover, Layout } from 'antd';
import Zone from './Zone';
import b17f from '../Images/b17f-test.png'


const GamePage = () => {
  const ctx = useContext(GameContext);
  const [showRoller, setShowRoller] = useState(false);
  // const [step, setStep] = useState(0);
  const step = ctx.step;

  const jumpToStep = () => {

    ctx.setCampaign({
      id: 1,
      campaign: 1,
      timePeriod: '2/1943',
      aircraft: 'B-17F',
      base: '8th Airforce (England)',
      missions: 25,
      altMissions: null
    })
    ctx.setBomber('B-17F');
    ctx.setTimePeriod('2/1943');
    ctx.setTarget('Leone');
    ctx.setTargetType('Airfield');
    ctx.setCell('middle');
    ctx.setBomberNumber(3);
    ctx.setZones(5);
    ctx.setZonesInfo([{
      zone: 1,
      targetZone: false,
      drm: 'N/A',
      location: 'E'
    },
    {
      zone: 2,
      targetZone: false,
      drm: '-2',
      location: 'W'
    },
    {
      zone: 3,
      targetZone: false,
      drm: '-2',
      location: 'W'
    },
    {
      zone: 4,
      targetZone: false,
      drm: '-1',
      location: 'F'
    },
    {
      zone: 5,
      targetZone: true,
      drm: '0',
      location: 'F'
    }]);
    ctx.setCurrentZone(1);
    const zones = ctx.zonesInfo;
    for (const zone of zones) {
      if (zone.zone === ctx.currentZone) {
        zone.escort = 'fair';
        break;
      }
    }
    ctx.setEscort('fair');
    ctx.setOutbound(true);
    ctx.setStep(17);
  }

  const nextStep = () => {
    ctx.setStep(ctx.step + 1);
  }
  const lastStep = () => {
    if (ctx.step > 0) {
      if (ctx.step === 1) {
        ctx.setCampaign(null);
      }
      ctx.setStep(ctx.step - 1);
    }
  }

  const handleRoll = () => {
    const result = rollDice(6);
    const campaign = (TABLE_2_1.find(c => c.id === result));
    ctx.setCampaign(campaign);
  }
  return <>
    <h1 style={{ opacity: 0.6, fontWeight: 600 }}>Target for Today Helper</h1>

    {ctx.step === 0 && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={nextStep}>Start Game</button>}
    {ctx.step === 0 && <button style={{ fontFamily: 'Courier', opacity: 0.7 }} onClick={jumpToStep}>Test Game</button>}
    {ctx.step > 0 && <div className='row'>
      <div className='bigColumn'>
        Campaign Info
        {step >= 1 && ctx.campaign && <span style={{ opacity: 0.6 }}> <h3>CAMPAIGN #: {ctx.campaign?.campaign}</h3>
          <h4>PERIOD: {ctx?.timePeriod}</h4>
          <h4>AIRCRAFT: {ctx?.bomber}{ctx.noseTurret ? <span style={{ fontSize: 12 }}>{ctx?.bomber === 'B-24J' && `(${ctx?.noseTurret})`}</span> : null}</h4>
          <h5>BASING: <span>{ctx.campaign?.base}</span></h5>
          <h5>MISSIONS: {ctx.campaign?.missions}</h5>
          <h5>TARGET: {ctx?.target}</h5>
          <h5>TARGET TYPE: {ctx?.targetType}</h5>
          <h5>Formation Position: {ctx?.cell?.cell}, {ctx?.bomberNumber}</h5>
          <h5>modifier: modifier on table 5-2: {ctx?.cell?.modifier}</h5>
        </span>

        }
        {ctx.zonesInfo && <Zone />}
        {ctx.zonesInfo && <img src={b17f} style={{ width: 700 }} />}
      </div>
      <div className='column'>
        Game Step Helper
        {step >= 1 && <PreMissionInfo
          step={step} />}
      </div>
      {/* <div className='column'>Bomber Card
      </div> */}
    </div>}

  </>
}

export default GamePage;