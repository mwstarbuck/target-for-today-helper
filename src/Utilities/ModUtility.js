import React, { useContext } from 'react';
import GameContext from '../Game/GameContext';

// const ModUtility = () => {
//   const ctx = useContext(GameContext);
  // const contextEnum = {
  //   'setCampaign': ctx?.setCampaign,
  //   'setStep': ctx?.setStep,
  //   'setBomber': ctx?.setBomber,
  //   'setTimePeriod': ctx?.setTimePeriod,
  //   'setNoseTurret': ctx?.setNoseTurret,
  //   'setCrew': ctx?.setCrew,
  //   'setTargetType': ctx?.setTargetType,
  //   'setTarget': ctx?.setTarget,
  //   'setCell': ctx?.setCell,
  //   'setBomberNumber': ctx?.setBomberNumber,
  //   'setModifiers': ctx?.setModifiers,
  //   'modifiers': ctx?.modifiers,
  //   'setZones': ctx?.setZones,
  //   'setCurrentZone': ctx?.setCurrentZone,
  //   'currentZone': ctx?.currentZone,
  //   'outbound': ctx?.outbound,
  //   'aircraft': ctx?.bomber,
  //   'resistance': ctx?.zonesInfo?.find(z => z.zone === ctx.currentZone)?.resistance,
  //   'escort': ctx?.escort,
  //   'period': ctx?.campaign.period,
  //   'base': ctx?.campaign.base,
  // }
  const thing = [{
    type: 'if',
    info: [
      {
        this: 'angle',
        thisValue: 'Vertical Dive',
        that: 'period',
        thatValue: ['12/1943', '1/1943', '2/1943', '12/1943', '1/1944', '2/1944', '12/1944', '1/1945', '2/1945'],
        reuslt: -2,
        message: '-2 for missions flown in Jan, Feb, or Dec'
      },
      {
        this: 'base',
        thisValue: '8th Airforce (England)',
        that: 'period',
        thatValue: ['10/1942', '11/1942', '3/1943', '4/1943', '10/1943', '11/1943', '3/1944', '4/1944', '10/1944', '11/1944', '3/1945', '4/1945'],
        reuslt: -1,
        message: '-1 for missions flown in Mar, Apr, Oct or Nov'
      },
      {
        this: 'base',
        thisValue: '15th Airforce (Italy)',
        that: 'period',
        thatValue: ['5/1944', '10/1944'],
        reuslt: 1,
        message: '+1 for missions flown in Mar or Oct'
      },
      {
        this: 'base',
        thisValue: '15th Airforce (Italy)',
        that: 'period',
        thatValue: ['6/1944', '9/1944'],
        reuslt: 2,
        message: '+2 for missions flown in Mar or Oct'
      },
      {
        this: 'base',
        thisValue: '15th Airforce (Italy)',
        that: 'period',
        thatValue: ['7/1944', '8/1944'],
        reuslt: 2,
        message: '+3 for missions flown in Mar or Oct'
      },   
    ],
    // type: 'ifThen',
    // info: [
    //   {
    //     this: gameCTX.targetedFighter.angle,
    //     thisValue: 'Vertical Dive',
    //     reuslt: -3,
    //     message: ' for defensive fire against VERTICAL DIVE fighter position.'
    //   },
    // ],
  }]

export const makeMods = (mods, contextEnum) => {
  let modDisplay = { result: 0, modList: [] };
  console.log(mods);
  mods?.forEach(mod => {
    switch (mod.type) {
      case 'thisThenThat':
        mod.info?.forEach(check => {
          if (contextEnum[check.this] === check.thisValue) {
            if (check.thatValue.includes(contextEnum[check.that])) {
              modDisplay.modList.push(check.message);
              const sum = modDisplay.result + check.result
              modDisplay.result = sum;
            }
          }
        });
        break;
      case 'ifThen':
          mod.info?.forEach(check => {
            if (check.this === check.thisValue) {
              modDisplay.modList.push(check.message);
              const sum = modDisplay.result + check.result
              modDisplay.result = sum;
            }
          })
        break;
      default:
        break;
    }
  });

  if (modDisplay.modList.length > 0) {
    return modDisplay;
  }
  else {
    modDisplay.reuslt = 'No modifiers for this table'
    return modDisplay;
  }
}

// }
