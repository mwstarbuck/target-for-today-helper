import { TABLE_2_1, TABLE_2_2 } from "../Data/Tables";

export const rollDice = (max) => {
  const result = Math.floor(Math.random() * max + 1);
  console.log(result);
  return result;
}

export const campaignRoll = (setter) => {
  const result = rollDice(6);
  const campaign = (TABLE_2_1.find(c => c.id === result));
  setter(campaign);
}

export const getResult = (max, table, type) => {
  const roll = rollDice(max)
  switch (type) {
    case 'd100':
      console.log((table.find(x => x.value.includes(roll))));
      break;

    default:
      break;
  }
}
