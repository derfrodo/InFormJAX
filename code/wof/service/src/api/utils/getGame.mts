import { getGameRepo } from "../../data/GameRepo.mjs";


export async function getGame() {
  const repo = await (getGameRepo());
  const result = await repo.findOne({ where: { id: 1 } });
  return result;
}
