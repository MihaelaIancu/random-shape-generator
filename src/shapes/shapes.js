import * as PIXI from "pixi.js";
import "@pixi/graphics-extras";

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
  
  shape.beginFill(shapeColor);

  switch (shapeType) {
    case "triangle":
      shape.moveTo(0, 0);
      shape.lineTo(50, 0);
      shape.lineTo(25, 50);
      shape.lineTo(0, 0);
      break;

    case "rectangle":
      shape.drawRect(0, 0, 50, 50);
      break;

    case "pentagon":
      shape.drawStar(0, 0, 5, 25, 50);
      break;

    case "hexagon":
      shape.drawStar(0, 0, 6, 25, 50);
      break;

    case "circle":
      shape.drawCircle(25, 25, 25);
      break;

    case "ellipse":
      shape.drawEllipse(25, 25, 25, 15);
      break;

    case "star":
      shape.drawStar(0, 0, 5, 25, 50);
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

  return shape;
};
