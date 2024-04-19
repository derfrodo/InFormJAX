import { WheelValueData } from "../../data/WheelValueData.mjs";
import { getWheelValuesRepo } from "../../data/WheelValuesRepo.mjs";
import { WheelValue } from "./types/WheelValue.mjs";
let wheelParts: WheelValue[] = [];

export const getWheelValues: () => Promise<WheelValueData[]> = async () => {
  const repo = await getWheelValuesRepo();
  return (await repo.findAll()).map(v => v.dataValues);
};

export const updateOrAddWheelValue: (
  value: WheelValue
) => Promise<WheelValueData[]> = async (value: WheelValueData) => {
  const repo = await getWheelValuesRepo();
  repo.update({ ...value, }, { limit: 1, where: { id: value.id } })
  return (await repo.findAll()).map(v => v.dataValues);
};

export const getMaternaValue: () => Promise<WheelValue> = async () => {
  return {
    name: "Materna",
    winText: "Gewinne mit Materna!",
    win: true,
    imagePath: "/assets_generated/logo.jpg",
    image: null,
    winChance: 0.45,
    disabled: false,
  };
};

export const WHEELVALUES: WheelValue[] = [
  {
    name: "Zauberwürfel",
    winText: "Zauberhaft!",
    win: true,
    imageText: "🎲",
    winChance: 0.05,
    disabled: true,
  },
  {
    name: "Leider nix",
    winText: "Vielleicht das nächste Mal.",
    win: false,
    imageText: "😢",
    winChance: 0.5,
    disabled: false,
  },
  {
    name: "Leider verloren",
    winText: "Vielleicht das nächste Mal.",
    win: false,
    imageText: "😒",
    winChance: 0.5,
    disabled: true,
  },
];
