import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";

let totalArea = 0;
let infoArea = document.querySelectorAll("span")[1];

export const getRandomColor = () => {
  return Math.random() * 0xffffff;
};

export const getRandomShape = () => {
  const shape = [
    "triangle",
    "rectangle",
    "pentagon",
    "hexagon",
    "circle",
    "ellipse",
    "star",
  ];

  return shape[Math.floor(Math.random() * shape.length)];
};

export const drawShape = (shapeType, shapeColor, app) => {
  const shape = new PIXI.Graphics();
  const area = calculateArea(shapeType, shape);
  totalArea += area;

  shape.beginFill(shapeColor);

  switch (shapeType) {
    case "triangle":
      shape.moveTo(0, 0);
      shape.lineTo(40, 0);
      shape.lineTo(20, 40);
      shape.lineTo(0, 0);
      break;

    case "rectangle":
      shape.drawRect(0, 0, 50, 50);
      break;

    case "pentagon":
      shape.drawStar(0, 0, 5, 20, 40);
      break;

    case "hexagon":
      shape.drawStar(0, 0, 6, 20, 40);
      break;

    case "circle":
      shape.drawCircle(25, 25, 25);
      break;

    case "ellipse":
      shape.drawEllipse(15, 15, 40, 15);
      break;

    case "star":
      shape.drawStar(0, 0, 5, 20, 40);
      break;
  }

  shape.endFill();

  const sprite = new PIXI.Sprite(app.renderer.generateTexture(shape));
  sprite.width = shape.width;
  sprite.height = shape.height;

  sprite.anchor.set(0.5);

  shape.sprite = sprite;
  sprite.interactive = true;
  sprite.on("pointerover", () => {
    sprite.cursor = "pointer";
  });

  infoArea.innerHTML = Math.floor(totalArea);
  return shape;
};

export const calculateArea = (shapeType, shape) => {
  switch (shapeType) {
    case "triangle":
      return shape.width * shape.height * 0.5;

    case "rectangle":
      return shape.width * shape.height;

    case "pentagon":
      return 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(20, 2);

    case "hexagon":
      return ((3 * Math.sqrt(3)) / 2) * Math.pow(20, 2);

    case "circle":
      return Math.PI * Math.pow(shape.width / 2, 2);

    case "ellipse":
      return Math.PI * (shape.width * 2) * (shape.height * 2);

    case "star":
      return 0.25 * Math.sqrt(5 * (5 + 2 * Math.sqrt(5))) * Math.pow(20, 2);
      
    default:
      return 0;
  }
};
