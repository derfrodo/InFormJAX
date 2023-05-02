import { UpdateDisplaySettingsMutationReturnType } from "@/Configuration/DisplaySettings/UpdateDisplaySettingsMutationReturnType";


export const CONFETTI_DELAY = 500;
export const AFTER_CONFETTI_DELAY = 4000;
export const sessionDisplaySettings: UpdateDisplaySettingsMutationReturnType = {
  showResultAfterMS: CONFETTI_DELAY,
  showResultForMS: AFTER_CONFETTI_DELAY,
};
