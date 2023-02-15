import React, { useContext, useState } from 'react';
import { Row, Col, Radio, Checkbox, Input } from 'antd';
import { GameContext } from './GameContext';
import { tableEnum } from '../Data/Tables';
import { rollDice } from '../Utilities/Utilities';
import CrewCard from './CrewCard';




const Crew = () => {
  const ctx = useContext(GameContext);

  //#region Methods
  const getCrewLocation = (id, bomber) => {
    switch (id) {
      case 0: //Piolot
        return 'Pilot Comp.';
      case 1: //copilot
        return 'Pilot Comp.';
      case 2: //Bombardier
        return 'Nose Comp.';
      case 3: //Navigator
        return 'Nose Comp.';
      case 4: //Engineer
        return 'Pilot Comp.';
      case 5: //Radio Operator
        if (bomber === 'B-24D' || bomber === 'B-24J')
          return 'Pilot Comp.';
        else
          return 'Radio Comp.';
      case 6: //Left Waist Gunner
        return 'Waist Comp.';
      case 7: //Right Waist Gunner
        return 'Waist Comp.';
      case 8: //Ball Gunner
        return 'Waist Comp.';
      case 9: //Tail Gunner
        return 'Tail Comp.';
      case 10: //Ammo Stocker
        return 'Radio Comp.';
      default:
        break;
    }
  }

  const rollCrew = (setter) => {
    const crew = [];

    const crewEnum = {
      0: 'Pilot',
      1: 'Copilot',
      2: 'Bombardier',
      3: 'Navigator',
      4: 'Engineer',
      5: 'Radio Operator',
      6: 'Left Waist Gunner',
      7: 'Right Waist Gunner',
      8: 'Ball Gunner',
      9: 'Tail Gunner',
      10: 'Ammo Stocker'
    };

    for (let i = 0; i < 4; i++) {
      let roll = rollDice(100) - 1;
      const last = tableEnum['last_name'][roll];

      roll = rollDice(100) - 1;
      const first = tableEnum['first_name'][roll];

      let ageRoll1 = rollDice(6);
      let ageRoll2;
      ageRoll2 = rollDice(6);

      const rollSum = ageRoll1 + ageRoll2;
      let tempAge;
      if (rollSum === 11) {
        tempAge = (rollDice(6) < 4 ? 27 : 28);
      }
      else
        tempAge = tableEnum['co_age'].find(a => a.value === rollSum).age;
      const coAge = tempAge;

      roll = rollDice(100);
      let tempState;
      if (roll === 100) {
        tempState = (rollDice(4) > 4 ? 'HI' : 'AK');
      }
      else
        tempState = tableEnum['home_state'].find(hs => hs.value.includes(roll)).state;
      const homeState = tempState;
      const member = {
        id: i,
        position: crewEnum[i],
        name: `${last}, ${first}`,
        age: coAge,
        state: homeState,
        status: 'Healthy', // 1 light wound, 2 lw, 1 serious wound, kia
        location: getCrewLocation(i, ctx?.bomber), // compartment
        frostbite: 'None', // none, frostbite, severe frostbite
        ace: false,
        kills: 0
        // compartment (string or enum), gun (string or enum), frostbite (bool), skill, awards
      }
      crew.push(member);
    }

    for (let i = 4; i < 10; i++) {
      let roll = rollDice(100) - 1;
      const last = tableEnum['last_name'][roll];

      roll = rollDice(100) - 1;
      const first = tableEnum['first_name'][roll];

      let ageRoll1 = rollDice(6);
      let ageRoll2;
      ageRoll2 = rollDice(6);

      const rollSum = ageRoll1 + ageRoll2;
      let tempAge;
      if (rollSum === 2) {
        tempAge = (rollDice(6) < 4 ? 18 : 19);
      }
      else if (rollSum === 3) {
        let roll = rollDice(6)
        if (roll < 3)
          tempAge = 27
        else if (roll < 5)
          tempAge = 28
        else
          tempAge = 29
      }
      else if (rollSum === 4) {
        tempAge = (rollDice(6) < 4 ? 30 : 31);
      }
      else if (rollSum === 10) {
        tempAge = (rollDice(6) < 4 ? 25 : 26);
      }
      else if (rollSum === 11) {
        tempAge = (rollDice(6) < 4 ? 32 : 33);
      }
      else if (rollSum === 12) {
        let roll = rollDice(6)
        if (roll < 3)
          tempAge = 34
        else if (roll < 5)
          tempAge = 35
        else
          tempAge = 36
      }
      else
        tempAge = tableEnum['nco_age'].find(a => a.value === rollSum).age;
      const coAge = tempAge;

      roll = rollDice(100);
      let tempState;
      if (roll === 100) {
        tempState = (rollDice(4) > 4 ? 'HI' : 'AK');
      }
      else
        tempState = tableEnum['home_state'].find(hs => hs.value.includes(roll)).state;
      const homeState = tempState;
      const member = {
        id: i,
        position: crewEnum[i],
        name: `${last}, ${first}`,
        age: coAge,
        state: homeState,
        status: 'Healthy', // 1 light wound, 2 lw, 1 serious wound, kia
        location: getCrewLocation(i, ctx?.bomber), // compartment
        frostbite: 'None', // none, frostbite, severe frostbite
        ace: false,
        kills: 0
        // compartment (string or enum), gun (string or enum), frostbite (bool), skill, awards
      }
      crew.push(member);
    }
    setter(crew);
  }

  //#endregion methods

  return <>
  <Row gutter={[24, 32]} style={{padding: 8}}>
        {
          ctx?.crew && ctx.crew.map((c, i) => 
    <Col span={8}>
          <CrewCard crewman={c}/>
          </Col>
          )}
  {/* {
    ctx?.crew && ctx.crew.map((c, i) => <p style={{ fontSize: 16 }} key={i}>{`${c.position}: 
          ${c.name}, Age: ${c.age}, State: ${c.state}, Status: ${c.status}, Location: ${c.location}, Frostbite: ${c.frostbite}, Skill: ${c.ace}, Kills: ${c.kills}`}</p>)
  } */}
  </Row>
  </>
}

export default Crew;