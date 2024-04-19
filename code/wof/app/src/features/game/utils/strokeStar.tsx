import { MATERNA_RED } from "../App";

// kindly have a look at: https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5#25840319

export function strokeStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  r: number,
  n: number,
  inset: number,
  color = MATERNA_RED
) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.translate(x, y);
  ctx.moveTo(0, 0 - r);
  for (let i = 0; i < n; i++) {
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r * inset);
    ctx.rotate(Math.PI / n);
    ctx.lineTo(0, 0 - r);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}
