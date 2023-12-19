import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { initializePIXI } from "./utils/pixi-setup.js";
import { initializeMatter } from "./utils/physics.js";
import { shapesGenerator } from "./utils/app.js";
import {
  isMobile,
  isPortrait,
  updateGravityValue,
  updateShapeNo,
  stage,
  gravityValueLabel,
  infoArea,
  refreshBtn,
} from "./utils/functionality.js";
import "./index.css";

isMobile();
isPortrait();

const app = initializePIXI();
const engine = initializeMatter();

stage.appendChild(app.view);

updateGravityValue(engine, gravityValueLabel);

setInterval(() => {
  let initialX = Math.random() * stage.offsetWidth;
  let gravityValue = engine.gravity.y;
  let initialY =
    gravityValue < 0
      ? stage.getBoundingClientRect().bottom
      : -stage.getBoundingClientRect().top;

  const shape = shapesGenerator(app, engine, shapesContainer, gravityValue);

  Matter.Body.setPosition(shape.body, { x: initialX, y: initialY });
  Matter.World.add(engine.world, [shape.body]);

  shapesContainer.addChild(shape.sprite);
}, 1000);

stage.addEventListener("click", (event) => {
  let mouseX = event.clientX - stage.getBoundingClientRect().left;
  let mouseY = event.clientY - stage.getBoundingClientRect().top;

  let gravityValue = engine.gravity.y;

  const shape = shapesGenerator(app, engine, shapesContainer, gravityValue);
  Matter.Body.setPosition(shape.body, { x: mouseX, y: mouseY });
  Matter.World.add(engine.world, [shape.body]);
  shapesContainer.addChild(shape.sprite);
});

refreshBtn.addEventListener("click", () => {
  shapesContainer.removeChildren();
  shapesContainer.destroy({ children: true, texture: true, baseTexture: true });

  const newShapesContainer = new PIXI.Container();
  newShapesContainer.mask = maskContainer;
  app.stage.addChild(newShapesContainer);

  shapesContainer = newShapesContainer;
  updateShapeNo(newShapesContainer.children.length);
  infoArea.innerHTML = 0;
});

// Mask container
const maskContainer = new PIXI.Graphics();
maskContainer.beginFill(0xeef0e5);
maskContainer.drawRect(0, 0, 640, 360);
maskContainer.endFill();
app.stage.addChild(maskContainer);

// Shapes container
let shapesContainer = new PIXI.Container();
shapesContainer.mask = maskContainer;
app.stage.addChild(shapesContainer);
