export const RADIUS =
  Number.isNaN(Number(process.env.REACT_APP_RADIUS)) === false &&
  Number(process.env.REACT_APP_RADIUS) > 0
    ? Number(process.env.REACT_APP_RADIUS)
    : 340;
