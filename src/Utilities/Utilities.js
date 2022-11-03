import { createContext } from "react";
import { tableEnum } from "../Data/Tables";

let engine = -1;
let weather = 3;

const modEnum = {
  'weather': weather, //ctx.weather
  'engine': engine
}

export const rollDice = (max) => {
  const result = Math.floor(Math.random() * max + 1);
  // console.log(result);
  return result;
}

const processModifiers = (modifiers) => {
  const modList = []
  let mod = modifiers?.forEach(m => {
    const modifier = modEnum[m]
    mod += modifier;
    if (modifier !== 0) {
      const prefix = modifier > 0 ? '+' : '-';
      modList.push(`${m}: ${prefix}${modifier}`)
    }
  })
  return { modifier: mod, log: modList }
}

const modifyRoll = (roll, modifier) => {
  return roll + modifier;
}

const setResult = (result, setter) => {
  setter(result);
}
export const getResult = (roll, diceType, table) => {

  const theTable = tableEnum[table];
  switch (diceType) {

    case 'd6':
      return theTable.find(x => x.id === roll);
    case 'd6-simple':
      return theTable.find(x => x.id === roll).label;
    case 'd100':
      return theTable.find(x => x.value.includes(roll));
    default:
      break;
  }
}

const processResult = (stepInfo) => {
  const roll = rollDice(stepInfo.maxValue);
  let modInfo = {};
  if (stepInfo.modifiers && stepInfo.modifiers.length > 0) {
    modInfo = processModifiers(stepInfo.modifiers);
  }
  else {
    modInfo = { modifier: 0, log: [] }
  }
  const modifiedRoll = modifyRoll(roll, modInfo.modifier);
  const result = getResult(modifiedRoll, stepInfo.diceType, stepInfo.table);
  setResult(result, stepInfo.setter);
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
    6: 'Pt Waist Gunner',
    7: "Stb. Waist Gunner",
    8: "Ball Gunner",
    9: 'Tail Gunner'
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
      position: crewEnum[i],
      name: `${last}, ${first}`,
      age: coAge,
      state: homeState,
      status: 'Good'
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
    if (rollSum === 11) {
      tempAge = (rollDice(6) < 4 ? 27 : 28);
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
      position: crewEnum[i],
      name: `${last}, ${first}`,
      age: coAge,
      state: homeState,
      status: 'Good'
    }
    crew.push(member);
  }
  setter(crew);
}

const getBomberPosition = (setters) => {
  let roll = rollDice(3);
  const setCell = setters.setCell
  const cellTable = tableEnum['combat_box_cell'];
  const cell = cellTable.find(c => c.value === roll).label;
  const prevMods = setters.modifiers;
  let newMods = [];
  let cellModifier;
  if (cell === 'Low')
    cellModifier = 1;
  if (cell === 'Middle')
    cellModifier = -1;
  setCell({ cell: cell, modifier: cellModifier });
  cellModifier && newMods.push({ relation: 'cell', modifier: `modifier on table 5-2: ${cellModifier}` })

  roll = rollDice(36);
  let number;
  let numberMod;
  const setBomberNumber = setters.setBomberNumber;
  const numberTable = tableEnum['bomber_number'];
  switch (cell) {
    case 'High':
      number = numberTable.find(p => p.value.includes(roll)).high;
      while (number === 'roll again') {
        const reroll = rollDice(36);
        number = numberTable.find(p => p.value.includes(reroll)).high;
      }
      if (number === 7) {
        setBomberNumber(`${number} (Cell Leader)`);
        newMods.push({ relation: 'bomberPosition', modifier: `Cell leader: + 1 ME-109 12 O'Clock` });
      }
      else if (number === 11) {
        setBomberNumber(`${number} (Tail End Charlie)`);
        newMods.push({ relation: 'bomberPosition', modifier: `Cell leader: + 1 ME-109 6 O'Clock` });
      }
      else
        setBomberNumber(number);
      break;
    case 'Low':
      number = numberTable.find(p => p.value.includes(roll)).low;
      while (number === 'roll again') {
        const reroll = rollDice(36);
        number = numberTable.find(p => p.value.includes(reroll)).low;
      }
      if (number === 13) {
        setBomberNumber(`${number} (Cell Leader)`);
        newMods.push({ relation: 'bomberPosition', modifier: `Cell leader: + 1 ME-109 12 O'Clock` });
      }
      else if (number === 18) {
        setBomberNumber(`${number} (Tail End Charlie)`);
        newMods.push({ relation: 'bomberPosition', modifier: `Cell leader: + 1 ME-109 6 O'Clock` });
      }
      else
        setBomberNumber(number);
      break;
    case 'Middle':
      number = numberTable.find(p => p.value.includes(roll)).middle;
      while (number === 'roll again') {
        const reroll = rollDice(36);
        number = numberTable.find(p => p.value.includes(reroll)).middle;
      }
      if (number === 1) {
        setBomberNumber(`${number} (Group Mission Lead Bomber)`);
        newMods.push({ relation: 'bomberPosition', modifier: `Cell leader: + 1 ME-109 12 O'Clock` });
      }
      else
        setBomberNumber(number);
      break;
    default:
      break;
  }
  setters.setModifiers(([...prevMods, ...newMods]));
}

const zoneMovement = (stepInfo) => {
  let value = stepInfo.value
  const zones = stepInfo.zones
  if (stepInfo.outbound) {
    if (value + 1 > zones) {
      value = zones;
      stepInfo.setter(value);
    }
    else {
      stepInfo.setter(value + 1);
    }
  }
  else {
    if (value - 1 < 1) {
      value = 1;
      stepInfo.setter(value);
    }
    else {
      stepInfo.setter(value - 1);
    }
  }
}
export const actionEnum = {
  'getResult': getResult,
  'processResult': processResult,
  'rollCrew': rollCrew,
  'getBomberPosition': getBomberPosition,
  'zoneMovement': zoneMovement
  //more to  come
}

