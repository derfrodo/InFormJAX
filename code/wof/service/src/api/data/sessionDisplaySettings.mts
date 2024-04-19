import { DisplaySettings, Maybe } from "../generated-types/graphql.mjs";

export const CONFETTI_DELAY = 500;
export const AFTER_CONFETTI_DELAY = 4000;
export const sessionDisplaySettings: Maybe<DisplaySettings> = {
  showResultAfterMS: CONFETTI_DELAY,
  showResultForMS: AFTER_CONFETTI_DELAY,
};
