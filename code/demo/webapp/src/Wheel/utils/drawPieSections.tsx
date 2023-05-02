import { WHEELPARTS } from "../constants/WHEELPARTS";
import { anglePart } from "../constants/anglePart";
import { anglePartHalf } from "../constants/anglePartHalf";
import { WheelValue } from "../types/WheelValue";

export async function drawPieSections(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  values: WheelValue[],
  devicePixelRatio: number,
  radius: number
) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = "12pt arial";

  const loadingImages = values.map(async (value) => {
    const { imagePath } = value;
    if (imagePath) {
      const image = await new Promise<HTMLImageElement>((r) => {
        const image = new Image();
        image.src = imagePath;
        image.onload = () => {
          r(image);
        };
      });
      return {
        imagePath,
        image,
      };
    }
    return {
      imagePath,
      image: null,
    };
  });

  const images = await Promise.all(loadingImages);
  for (var i = 0; i < WHEELPARTS; i++) {
    const angle = anglePart * i - anglePartHalf;
    context.fillStyle = i % 2 ? "#91A5BE" : "#CEE9D3";
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 3;
    context.moveTo(radius * devicePixelRatio, radius * devicePixelRatio);
    context.arc(
      radius * devicePixelRatio,
      radius * devicePixelRatio,
      radius * devicePixelRatio,
      angle,
      angle + anglePart,
      false
    );
    context.closePath();
    context.stroke();
    context.fill();

    context.save();
    context.translate(radius * devicePixelRatio, radius * devicePixelRatio);
    context.rotate(angle + anglePartHalf);

    const index = i % values.length;
    const data = values[index];
    context.fillStyle = "#000000";

    const image = images[index];

    if (data.imageText) {
      const fontSize = radius / 4;
      context.font = `${fontSize}px arial`;

      const dvRad = radius * devicePixelRatio;
      const measure = context.measureText(data.imageText);

      const distance =
        dvRad - fontSize * devicePixelRatio - 10 * devicePixelRatio;
      context.translate(distance, 0);
      context.rotate(Math.PI / 2);
      context.translate(-measure.width / 2, 0);

      context.fillText(data.imageText, 0, 0);
    } else if (image.image) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      const aspectRatio =
        image.image.height !== 0 ? image.image.width / image.image.height : 1;

      const dvRad = radius * devicePixelRatio;
      const distance =
        dvRad - (radius / 8) * devicePixelRatio - 10 * devicePixelRatio;
      context.translate(distance, 0);

      context.rotate(Math.PI / 2);
      context.translate(-(radius / 16) * devicePixelRatio * aspectRatio, 0);

      context.drawImage(
        image.image,
        0,
        0,
        (radius / 8) * devicePixelRatio * aspectRatio,
        (radius / 8) * devicePixelRatio
      );
    } else {
      context.fillText(
        data.name,
        radius * devicePixelRatio - 160 * devicePixelRatio,
        0
      );
    }

    context.restore();
  }
}
