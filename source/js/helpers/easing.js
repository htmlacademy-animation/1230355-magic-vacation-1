function easeLinear(x) {
  return x;
}

function easeOutElastic(x) {
  const c4 = (2 * Math.PI) / 3;

  if (x === 0) {
    return 0;
  } else if (x === 1) {
    return 1;
  } else {
    return Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  }
}

function easeInCubic(x) {
  return x ** 3;
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function easeInOutSine(x) {
  return -(Math.cos(Math.PI * x) - 1) / 2;
}

let easing = Object.freeze({
  easeLinear,
  easeOutElastic,
  easeInCubic,
  easeOutCubic,
  easeInOutSine,
});

export default easing;
