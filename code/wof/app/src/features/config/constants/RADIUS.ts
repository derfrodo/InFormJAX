export const RADIUS =
  Number.isNaN(Number(import.meta.env.NEXT_PUBLIC_RADIUS)) === false &&
  Number(import.meta.env.NEXT_PUBLIC_RADIUS) > 0
    ? Number(import.meta.env.NEXT_PUBLIC_RADIUS)
    : 340;
