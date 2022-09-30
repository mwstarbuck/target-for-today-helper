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
  console.log(result);
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

// export const campaignRoll = (setter) => {
//   const result = rollDice(6);
//   const campaign = (TABLE_2_1.find(c => c.id === result));
//   setter(campaign);
// }

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

export const actionEnum = {
  'getResult': getResult,
  // 'campaignRoll': campaignRoll,
  'processResult': processResult,

}

