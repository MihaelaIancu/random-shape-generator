let infoShapes = document.querySelectorAll("span")[0];
let incrementGravityBtn = document.querySelector("#incrementGravity");
let decrementGravityBtn = document.querySelector("#decrementGravity");

export const isMobileAgent = () => {
  const { userAgent } = window.navigator;
  const isMobile = /.*Android.*|.*iPad.*|.*iPhone.*/i.test(userAgent);

  return isMobile;
};

export const isPortraitOrientation = () => {
  const isPortraitOrientation = screen.orientation?.type?.match(/portrait/i);

  return isPortraitOrientation;
};

export const isMobile = () => {
  const isMobile = isMobileAgent();

  return isMobile
    ? document.body.classList.add("mobile")
    : document.body.classList.add("desktop");
};

export const isPortrait = () => {
  const isPortrait = isPortraitOrientation();

  return isPortrait
    ? document.body.classList.add("portrait")
    : document.body.classList.add("landscape");
};

export const updateShapeNo = (count) => {
  infoShapes.innerHTML = count;
};

export const updateGravityValue = (engine, htmlElement) => {
  incrementGravityBtn.addEventListener("click", (event) => {
    event.preventDefault();

    engine.gravity.y = engine.gravity.y + 1;
    htmlElement.innerHTML = engine.gravity.y;
  });

  decrementGravityBtn.addEventListener("click", (event) => {
    event.preventDefault();

    engine.gravity.y = engine.gravity.y - 1;
    htmlElement.innerHTML = engine.gravity.y;
  });

  htmlElement.innerHTML = engine.gravity.y;
};


