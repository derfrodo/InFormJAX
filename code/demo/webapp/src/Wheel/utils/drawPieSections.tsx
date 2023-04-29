import { RADIUS } from "../constants/RADIUS";
import { WheelValue } from "../constants/WHEELVALUES";
import { WHEELPARTS } from "../constants/WHEELPARTS";
import { anglePart } from "../constants/anglePart";
import { anglePartHalf } from "../constants/anglePartHalf";
import { getDevicePixelRatio } from "./getDevicePixelRatio";

export function drawPieSections(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  values: WheelValue[],
  devicePixelRatio: number
) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "12pt arial";
  for (var i = 0; i < WHEELPARTS; i++) {
    const angle = anglePart * i - anglePartHalf;
    context.fillStyle = i % 2 ? "#91A5BE" : "#CEE9D3";
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 3;
    context.moveTo(
      RADIUS * devicePixelRatio,
      RADIUS * devicePixelRatio
    );
    context.arc(
      RADIUS * devicePixelRatio,
      RADIUS * devicePixelRatio,
      RADIUS * devicePixelRatio,
      angle,
      angle + anglePart,
      false
    );
    context.closePath();
    context.stroke();
    context.fill();

    context.save();
    context.translate(
      RADIUS * devicePixelRatio,
      RADIUS * devicePixelRatio
    );
    context.rotate(angle + anglePartHalf);

    const index = i % values.length;
    const data = values[index];
    context.fillStyle = "#000000";

    if (!data.image && data.imageText) {
      const fontSize = RADIUS / 4;
      context.font = `${fontSize}px arial`;

      const dvRad = RADIUS * devicePixelRatio;
      const measure = context.measureText(data.imageText);

      const distance = dvRad - fontSize - 40 * devicePixelRatio;
      context.translate(distance, 0);
      context.rotate(Math.PI / 2);
      context.translate(-measure.width / 2, 0);

      context.fillText(data.imageText, 0, 0);
    } else if (data.image) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.translate(
        RADIUS * devicePixelRatio -
          (20 + RADIUS / 8) * devicePixelRatio,
        -(RADIUS / 16) * devicePixelRatio
      );
      context.rotate(Math.PI / 2);

      context.drawImage(
        data.image,
        0,
        0,
        (RADIUS / 8) * devicePixelRatio,
        (RADIUS / 8) * devicePixelRatio
      );
    } else if (!data.image && !data.imageText) {
      context.fillText(
        data.name,
        RADIUS * devicePixelRatio - 160 * devicePixelRatio,
        0
      );
    }

    context.restore();
  }
}
