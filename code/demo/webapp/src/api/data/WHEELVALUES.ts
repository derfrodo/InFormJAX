import { WheelValue } from "./types/WheelValue";

export const getWheelValues: () => Promise<WheelValue[]> = async () => {
  const maternaValue = await getMaternaValue();
  return [maternaValue, ...WHEELVALUES];
};

const getMaternaValue: () => Promise<WheelValue> = async () => {
  const imagePath = await import("./../../Wheel/assets/Bild1.png");
  return {
    name: "Materna",
    winText: "Gewinne mit Materna!",
    win: true,
    imagePath: imagePath.default.src,
    image: null,
    winChance: 0.1,
  };
};

export const WHEELVALUES: WheelValue[] = [
  {
    name: "Zauberwürfel",
    winText: "Zauberhaft!",
    win: true,
    imageText: "🎲",
    winChance: 0.1,
  },
  {
    name: "Leider nix",
    win: false,
    imageText: "😢",
    winChance: 0.1,
  },
  {
    name: "Geiz ist sparsam",
    win: false,
    imagePath: "https://blog.derfrodo.de/assets/derfrodoLogoBlender_720p.png",
    winChance: 0.1,
  },
];
