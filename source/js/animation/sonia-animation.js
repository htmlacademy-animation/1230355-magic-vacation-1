const sonyaElement = document.getElementById(`screen-sonya`);

const createAnimationAppear = () =>
  sonyaElement.animate(
      [
        {transform: `translate(400px, 300px) rotateZ(-22deg) scale(0.3)`},
        {transform: `translate(0, 0) rotateZ(0) scale(1)`},
      ],
      {
        duration: 533,
        easing: `cubic-bezier(.17,.17,.37,1)`,
        delay: 400,
      }
  );

const createAnimationBounce = () =>
  sonyaElement.animate(
      [{transform: `translateY(0)`}, {transform: `translateY(-30px)`}],
      {
        duration: 1400,
        easing: `ease-in-out`,
        iterations: 1,
        fill: `both`,
      }
  );

let animation;

export const sonyaStartAnimation = () => {
  animation = createAnimationAppear();
  animation.play();

  animation.onfinish = () => {
    animation = createAnimationBounce();

    animation.onfinish = () => {
      animation.reverse();
    };
  };
};

export const sonyaEndAnimation = () => {
  if (!animation) {
    return;
  }

  animation.onfinish = () => {};
  animation.cancel();
  animation = createAnimationAppear();
  animation.reverse();

  animation.onfinish = () => {
    animation = null;
  };
};
