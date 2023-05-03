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
    winChance: 0.45,
  };
};

export const WHEELVALUES: WheelValue[] = [
  {
    name: "Zauberwürfel",
    winText: "Zauberhaft!",
    win: true,
    imageText: "🎲",
    winChance: .05,
  },
  {
    name: "Leider nix",
    winText: "Vielleicht das nächste Mal.",
    win: false,
    imageText: "😢",
    winChance: 0.5,
  },
  // {
  //   name: "Geiz ist sparsam",
  //   win: false,
  //   imagePath: "https://blog.derfrodo.de/assets/derfrodoLogoBlender_720p.png",
  //   winChance: 0.1,
  // },
];
