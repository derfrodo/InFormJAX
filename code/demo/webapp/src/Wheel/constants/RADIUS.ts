export const RADIUS =
  Number.isNaN(Number(process.env.NEXT_PUBLIC_RADIUS)) === false &&
  Number(process.env.NEXT_PUBLIC_RADIUS) > 0
    ? Number(process.env.NEXT_PUBLIC_RADIUS)
    : 340;
