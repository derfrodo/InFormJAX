// import Materna from "./../assets/Bild1.png";
import { WheelValue } from "../types/WheelValue";

export const getWheelValues: () => WheelValue[] = () =>
  WHEELVALUES.length !== 0 ? WHEELVALUES : MATERNA_WHEEL_VALUES;

const MATERNA_WHEEL_VALUES: WheelValue[] = [
  {
    name: "Materna",
    winText: "Du bist ein Maternagewinn!",
    win: true,
    // imagePath: Materna,
    image: null,
  },
  { name: "Leider nix", win: false, imageText: "😢", image: null },
];
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
    image: null,
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
  { name: "Leider nix", win: false, imageText: "😢", image: null },

  // Uncomment, if all over
  // { name: "Materna", winText: "Du bist ein Ehrengewinner!", win: true, imagePath: Materna, image: null },
  // { name: "Leider nix", win: false, imagePath: zonk, image: null },
];
