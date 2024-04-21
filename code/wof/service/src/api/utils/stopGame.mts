import { getDisplaySettingsRepo } from "../../data/DisplaySettingsRepo.mjs";
import { getGameResultsRepo } from "../../data/GameResultsRepo.mjs";
import { getWheelSettingsRepo } from "../../data/WheelSettingsRepo.mjs";
import { getGame } from "./getGame.mjs";
import { calculateWinner } from "./calculateWinner.mjs";
import { pubsub } from "./pubsub.mjs";

export async function stopGame(now: number) {
  const { showResultAfterMS, showResultForMS } = (await (await getDisplaySettingsRepo()).findOne({ where: { id: 1 } })).dataValues;
  const minClickDelay = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues.minClickDelayMS;

  const g = await getGame();
  const result = await calculateWinner();

  const resultRepo = await getGameResultsRepo();
  const createdResult = await resultRepo.create({
    resultId: result.result.id,
    date: new Date(Date.now()).toISOString(),
    win: result.result.win
  });

  await g.update({
    isRunning: false,
    lastUpdate: now,
    isRoundDone: false,
    resultId: createdResult.dataValues.resultId,
    canToggle: false,
  });
  pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });

  const doneDelay = showResultAfterMS + showResultForMS;
  setTimeout(async () => {
    const g = await getGame();
    await g.update({
      isRoundDone: true,
      canToggle: minClickDelay <= doneDelay,
    });
    pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
  }, doneDelay);

  if (minClickDelay > doneDelay) {
    setTimeout(async () => {
      const g = await getGame();
      await g.update({
        canToggle: true,
      });
      pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
    }, minClickDelay);
  }
  return (await getGame()).dataValues;
}
