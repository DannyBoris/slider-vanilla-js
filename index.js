const thumbEl = document.querySelector(".thumb");
const sliderContainer = document.querySelector(".container");
const positionDisplayEl = document.querySelector(".position-display");
const activeRangeEl = document.querySelector(".active-range");
const maxInputEl = document.querySelector("#max-input");
const minInputEl = document.querySelector("#min-input");

let isDraggable = false;
const SLIDER_WIDTH = 500;
const THUMB_SIZE = 30;
let MAX_VALUE = 100;
let MIN_VALUE = 0;

minInputEl.value = MIN_VALUE;
maxInputEl.value = MAX_VALUE;

let stepWidth = 100 / (MAX_VALUE - MIN_VALUE);

const sliderXOffset = sliderContainer.getBoundingClientRect().left;

function roundToNearest(numToRound, numToRoundTo) {
  numToRoundTo = 1 / numToRoundTo;
  return Math.round(Math.round(numToRound * numToRoundTo) / numToRoundTo);
}

function handleMinMaxChange(e) {
  if (e.target.id === "max-input") {
    MAX_VALUE = e.target.value;
  } else {
    MIN_VALUE = e.target.value;
  }
  stepWidth = 100 / (MAX_VALUE - MIN_VALUE);
}

const handleThumbChange = (e) => {
  if (!isDraggable && e.type === "mousemove") return;
  let nextPosition = ((e.clientX - sliderXOffset) / SLIDER_WIDTH) * 100;

  // percantage values
  if (nextPosition <= 0) nextPosition = 0;
  if (nextPosition >= 100) nextPosition = 100;

  const relativePosition = roundToNearest(nextPosition, stepWidth) + "%";

  thumbEl.style.left = relativePosition;
  activeRangeEl.style.width = relativePosition;

  positionDisplayEl.innerHTML = Math.round(
    nextPosition / stepWidth + +MIN_VALUE
  );
};

// Event listeners
document.addEventListener("mousemove", handleThumbChange);
sliderContainer.addEventListener("click", handleThumbChange);
maxInputEl.addEventListener("keyup", handleMinMaxChange);
minInputEl.addEventListener("keyup", handleMinMaxChange);
thumbEl.addEventListener("mousedown", function (e) {
  isDraggable = true;
});
document.addEventListener("mouseup", function (e) {
  isDraggable = false;
});
