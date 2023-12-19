import * as PIXI from "pixi.js";
import { isMobileAgent, isPortraitOrientation } from "./functionality";

const isMobile = isMobileAgent();
const isPortrait = isPortraitOrientation();

let width = 640;
let height = 360;

export const initializePIXI = () => {
  if (isMobile) {
    width = 350;
    height = 300;
  }

  if ( isMobile && !isPortrait) {
    width = 500;
    height = window.innerHeight / 2;
  }

  const app = new PIXI.Application({
    background: 0xeef0e5,
    width: width,
    height: height,
  });

  return app;
};
