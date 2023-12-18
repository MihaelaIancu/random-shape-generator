import * as PIXI from "pixi.js";
import Matter from "matter-js";
import { initializePIXI } from "./utils/pixi-setup.js";
import { initializeMatter } from "./utils/physics.js";
import { shapesGenerator } from "./utils/app.js";
import { isMobile, isPortrait, updateGravityValue } from "./utils/functionality.js";
import "./index.css";

isMobile();
isPortrait();

const app = initializePIXI();
const engine = initializeMatter();

let stage = document.querySelector("#stage");
let gravityValueLabel = document.querySelectorAll(".label")[1];

stage.appendChild(app.view);

updateGravityValue(engine, gravityValueLabel);

stage.addEventListener("click", (event) => {
  let mouseX = event.clientX - stage.getBoundingClientRect().left;
  let mouseY = event.clientY - stage.getBoundingClientRect().top;

  let gravityValue = engine.gravity.y;

  const shape = shapesGenerator(app, engine, shapesContainer, gravityValue);
  Matter.Body.setPosition(shape.body, { x: mouseX, y: mouseY });
  Matter.World.add(engine.world, [shape.body]);
  shapesContainer.addChild(shape.sprite);
});

// Mask container
let maskContainer = new PIXI.Graphics();
maskContainer.beginFill(0xeef0e5);
maskContainer.drawRect(0, 0, 640, 360);
maskContainer.endFill();
app.stage.addChild(maskContainer);

// Shapes container
let shapesContainer = new PIXI.Container();
shapesContainer.mask = maskContainer;
app.stage.addChild(shapesContainer);
