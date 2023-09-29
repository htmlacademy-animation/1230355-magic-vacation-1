import Animation from "../2d-animation/animation-2d";
import easing from '../../helpers/easing';

function getCurrentTransformPropertyByName(
    obj,
    propertyName,
    propertyDirection,
    transformTo,
    progress
) {
  const defaultValue = propertyName === `scale` ? 1 : 0;

  const fromValue =
    obj[propertyName] &&
    typeof obj[propertyName][propertyDirection] === `number`
      ? obj[propertyName][propertyDirection]
      : defaultValue;

  return transformTo[propertyName] &&
    typeof transformTo[propertyName][propertyDirection] === `number`
    ? fromValue +
        (transformTo[propertyName][propertyDirection] - fromValue) * progress
    : fromValue;
}

export function createObjectTransformAnimation(obj, transformTo, config) {
  return new Animation({
    func: (progress) => {
      obj.position.set(
          ...[`x`, `y`, `z`].map((propertyDirection) =>
            getCurrentTransformPropertyByName(
                obj,
                `position`,
                propertyDirection,
                transformTo,
                progress
            )
          )
      );
      obj.rotation.set(
          ...[`x`, `y`, `z`].map((propertyDirection) =>
            getCurrentTransformPropertyByName(
                obj,
                `rotation`,
                propertyDirection,
                progress
            )
          )
      );

      obj.scale.set(
          ...[`x`, `y`, `z`].map((propertyDirection) =>
            getCurrentTransformPropertyByName(
                obj,
                `scale`,
                propertyDirection,
                typeof transformTo.scale === `number`
                  ? {
                    scale: {
                      [propertyDirection]: transformTo.scale,
                    },
                  }
                  : transformTo,
                progress
            )
          )
      );
    },
    ...config,
  });
}

export function createBounceAnimation(obj) {
  const amplitude = 0.3 + Math.random() / 1.5;
  const period = 700 + 300 * Math.random();

  return new Animation({
    func: (_, {startTime, currentTime}) => {
      obj.position.y =
        obj.position.y +
        amplitude * Math.sin((currentTime - startTime) / period);
    },
    duration: `infinite`,
    delay: 2000,
    easing: easing.easeOutCubic,
  });
}
