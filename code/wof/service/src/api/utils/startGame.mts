import { getWheelSettingsRepo } from "../../data/WheelSettingsRepo.mjs";
import { getGame } from "./getGame.mjs";
import { pubsub } from "./pubsub.mjs";

export async function startGame(now: number, autoplayDoNotMakeToggleable = false) {
  const minClickDelay = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues.minClickDelayMS;

  const g = await getGame();

  await g.update({
    isRunning: true,
    lastUpdate: now,
    isRoundDone: false,
    resultId: null,
    canToggle: false,
  });

  pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
  if (!autoplayDoNotMakeToggleable) {

    setTimeout(async () => {
      const g = await getGame();
      await g.update({
        canToggle: true,
      });
      pubsub.publish('GAME_CHANGED', { gameChanged: g.dataValues });
    },
      minClickDelay
    );
  }
  return (await getGame()).dataValues;
}
