import { WheelValue } from "../types/WheelValue";

export const getWheelValues: () => Promise<WheelValue[]> = async () => {
  const maternaValue = await getMaternaValue();
  return [maternaValue, ...WHEELVALUES];
};

const getMaternaValue: () => Promise<WheelValue> = async () => {
  const imagePath = await import("./../assets/Bild1.png");
  return {
    name: "Materna",
    winText: "Gewinne mit Materna!",
    win: true,
    imagePath: imagePath.default.src,
    image: null,
  };
};

export const WHEELVALUES: WheelValue[] = [
  // Comment, if all over
  //   {
  //     name: "Flasche",
  //     winText: "Du gewinnst eine Flasche!",
  //     win: true,
  //     imagePath: flasche,
  //     image: null,
  //   },
  {
    name: "Zauberwürfel",
    winText: "Zauberhaft!",
    win: true,
    imageText: "🎲",
  },
  //   { name: "Leider nix", win: false, imagePath: zonk, image: null },
  //   {
  //     name: "Block",
  //     winText: "Du gewinnst einen Block!",
  //     win: true,
  //     imagePath: notizblock,
  //     image: null,
  //   },
  //   { name: "Leider nix", win: false, imagePath: zonk, image: null },
  //   {
  //     name: "Buch",
  //     winText: "Du gewinnst ein Buch!",
  //     win: true,
  //     imagePath: buch,
  //     image: null,
  //   },
  { name: "Leider nix", win: false, imageText: "😢" },
  { name: "Geiz ist sparsam", win: false, imagePath: "https://blog.derfrodo.de/assets/derfrodoLogoBlender_720p.png" }

  // Uncomment, if all over
  // { name: "Materna", winText: "Du bist ein Ehrengewinner!", win: true, imagePath: Materna, image: null },
  // { name: "Leider nix", win: false, imagePath: zonk, image: null },
];
