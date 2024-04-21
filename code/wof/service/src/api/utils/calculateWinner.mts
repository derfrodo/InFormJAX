import { CHECK_CHANCE } from "../data/constants/WIN_CHANCE";
import { getFilteredWheelParts } from "../data/disabledWheelValues.mjs";
import { getChanceToWin, getSumOfLooseChance, getSumOfWinChance } from "../graphql/types/gameInfoType.mjs";
import { isWinner } from "./isWinner.mjs";
import { getWinner } from "./getWinner.mjs";


export async function calculateWinner() {

  const winChance = await getChanceToWin();
  const sumOfLooseChance = await getSumOfLooseChance();
  const sumOfWinChance = await getSumOfWinChance();
  console.log("Calculate winner with chance", winChance);
  const winner = isWinner(winChance);

  if (CHECK_CHANCE) {
    let won = 0;
    let lost = 0;
    for (let i = 0; i < 1000000; i++) {
      if (isWinner(winChance)) {
        won++;
      } else {
        lost++;
      }
    }
    console.log("Checked chance", {
      won,
      lost,
      all: won + lost,
      winChance,
      actual: won / (won + lost),
    });
  }

  const values = await getFilteredWheelParts({ disabled: false });
  if (winner) {
    //WON!
    const winOptions = values.filter((value) => value.win);
    console.log({ values, winOptions });
    const winOffset = getWinner(sumOfWinChance, winOptions);
    const winIndex = values.indexOf(winOffset);
    return { index: winIndex, result: values[winIndex] };
  } else {
    // LOST!
    const lostOptions = values.filter((value) => !value.win);
    console.log({ values, lostOptions });
    const lostOffset = getWinner(sumOfLooseChance, lostOptions);
    const lostIndex = values.indexOf(lostOffset);
    return { index: lostIndex, result: values[lostIndex] };
  }
}
