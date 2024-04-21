import { Game } from "../../data/GameRepo.mjs";
import { getWheelSettingsRepo } from "../../data/WheelSettingsRepo.mjs";

export async function verifyToggleable<T extends Game>(g: T) {
  if (!g.canToggle) {
    throw new Error(`Please wait a sec... ;)`);
  }
  const minClickDelay = (await (await getWheelSettingsRepo()).findOne({ where: { id: 1 } })).dataValues.minClickDelayMS;
  const now = performance.now();
  const diff = g.lastUpdate + minClickDelay - now;
  if (diff > 0) {
    throw new Error(`Wait for additional ${diff}ms`);
  }
  return now;
}
