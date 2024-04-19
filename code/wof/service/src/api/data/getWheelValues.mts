import { WheelValue } from "./types/WheelValue.mjs";
import { readFile } from "fs/promises";
import { join } from "path";
let initialized: boolean = false;
let wheelParts: WheelValue[] = [];

export const getWheelValues: () => Promise<WheelValue[]> = async () => {
  if (!initialized) {
    const maternaValue = await getMaternaValue();
    wheelParts = [maternaValue, ...WHEELVALUES];
    initialized = true;
  }
  return wheelParts;
};

export const updateOrAddWheelValue: (
  value: WheelValue
) => Promise<WheelValue[]> = async (value: WheelValue) => {
  const values = await getWheelValues();
  const index = values.findIndex((v) => v.name === value.name);
  if (index >= 0) {
    values.splice(index, 1, value);
  } else {
    values.push(value);
  }
  return wheelParts;
};
// var bitmap = fs.readFileSync(file);
// // convert binary data to base64 encoded string
// return new Buffer(bitmap).toString('base64')

const getMaternaValue: () => Promise<WheelValue> = async () => {
  return {
    name: "Materna",
    winText: "Gewinne mit Materna!",
    win: true,
    imagePath: "/assets_generated/logo.jpg",
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
    winChance: 0.05,
  },
  {
    name: "Leider nix",
    winText: "Vielleicht das nächste Mal.",
    win: false,
    imageText: "😢",
    winChance: 0.5,
  },
  {
    name: "Leider verloren",
    winText: "Vielleicht das nächste Mal.",
    win: false,
    imageText: "😒",
    winChance: 0.5,
  },
];
