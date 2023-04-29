import { StaticImageData } from "next/image";


export type WheelValue = {
  name: string;
  win: boolean;
  imageText?: string | null;
  imagePath?: StaticImageData | string | null;
  image: null | HTMLImageElement;
  winText?: string;
};
