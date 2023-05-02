import { UpdateDisplaySettingsMutationReturnType } from "@/Configuration/DisplaySettings/UpdateDisplaySettingsMutationReturnType";
import {
  CONFETTI_DELAY,
  AFTER_CONFETTI_DELAY,
} from "@/Wheel/components/Winning";

export const sessionDisplaySettings: UpdateDisplaySettingsMutationReturnType = {
  showResultAfterMS: CONFETTI_DELAY,
  showResultForMS: AFTER_CONFETTI_DELAY,
};
