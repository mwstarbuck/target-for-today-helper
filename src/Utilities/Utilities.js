export const rollDice = (max) => {
  const result = Math.floor(Math.random() * max + 1);
  console.log(result);
  return result;
}