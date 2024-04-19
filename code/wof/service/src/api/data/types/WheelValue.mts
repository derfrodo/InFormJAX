export type WheelValue = {
  name: string;

  imageText?: string | null;
  imagePath?: string | null;
  winText?: string | null;

  winChance: number;
  
  win: boolean;
  disabled: boolean;
};
