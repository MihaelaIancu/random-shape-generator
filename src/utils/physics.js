import Matter from "matter-js";

export const initializeMatter = () => {
  const engine = Matter.Engine.create();
  engine.gravity.y = 0.5;

  Matter.Runner.run(engine);

  return engine;
};
