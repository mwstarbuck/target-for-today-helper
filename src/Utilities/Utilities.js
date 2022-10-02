import { tab } from "@testing-library/user-event/dist/tab";
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
      break;
    case 'd6-simple':
      return theTable.find(x => x.id === roll).label;
      break;
    case 'd100':
      return theTable.find(x => x.value.includes(roll));
      break;
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
    console.log('ageRoll1: ', ageRoll1, 'ageRoll2: ', ageRoll2, 'sum: ', rollSum)
    let tempAge;
    if (rollSum === 11) {
      console.log('altAgeRoll');
      tempAge = (rollDice(6) < 4 ? 27 : 28);
    }
    else
      tempAge = tableEnum['co_age'].find(a => a.value === rollSum).age;
    const coAge = tempAge;

    roll = rollDice(100);
    let tempState;
    if (roll === 100) {
      console.log('altStateRoll')
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
    console.log('ageRoll1: ', ageRoll1, 'ageRoll2: ', ageRoll2, 'sum: ', rollSum)
    let tempAge;
    if (rollSum === 11) {
      console.log('altAgeRoll');
      tempAge = (rollDice(6) < 4 ? 27 : 28);
    }
    else
      tempAge = tableEnum['nco_age'].find(a => a.value === rollSum).age;
    const coAge = tempAge;

    roll = rollDice(100);
    let tempState;
    if (roll === 100) {
      console.log('altStateRoll')
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
  console.log(crew);
  setter(crew);
}

export const actionEnum = {
  'getResult': getResult,
  // 'campaignRoll': campaignRoll,
  'processResult': processResult,
  'rollCrew': rollCrew

}

