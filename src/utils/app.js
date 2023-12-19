import Matter from "matter-js";
import { drawShape, getRandomColor, getRandomShape } from "../shapes/shapes.js";
import { updateShapeNo } from "./functionality.js";

let renderedShapesCount = 0;

export const shapesGenerator = (app, engine, container, gravityValue) => {
  engine.timing.timeScale = 0.01;

  const shapeType = getRandomShape();
  const shapeColor = getRandomColor();
  let shape = drawShape(shapeType, shapeColor, app);

  const body = Matter.Bodies.rectangle(
    shape.sprite.x,
    shape.sprite.y,
    shape.sprite.width,
    shape.sprite.height
  );

  shape.body = body;
  shapeTween(app, engine, shape, container, gravityValue);

  shape.sprite.interactive = true;
  shape.sprite.on("pointerup", () => {
    container.removeChild(shape.sprite);
    Matter.World.remove(engine.world, body);
    shape = null;
    renderedShapesCount--;
  });

  container.addChild(shape.sprite);
  Matter.World.add(engine.world, [body]);
  renderedShapesCount++;

  updateShapeNo(renderedShapesCount);

  return shape;
};

const shapeTween = (app, engine, shape, container, gravityValue) => {
  const body = shape.body;

  app.ticker.add(() => {
    Matter.Body.applyForce(body, { x: 0, y: 0 }, { x: 0, y: gravityValue });

    shape.sprite.x = body.position.x;
    shape.sprite.y = body.position.y;

    if (shape.sprite.y > 640) {
      container.removeChild(shape.sprite);
      Matter.World.remove(engine.world, body);
    }
  });
};
