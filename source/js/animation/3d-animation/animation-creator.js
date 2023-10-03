import Animation from '../2d-animation/animation-2d';
import easing from '../../helpers/easing';

function getCurrentTransformPropertyByName(
    propertyName,
    propertyDirection,
    transformFrom,
    transformTo,
    progress
) {
  const defaultValue = propertyName === `scale` ? 1 : 0;

  const fromValue =
    transformFrom[propertyName] &&
    typeof transformFrom[propertyName][propertyDirection] === `number`
      ? transformFrom[propertyName][propertyDirection]
      : defaultValue;

  return transformTo[propertyName] &&
    typeof transformTo[propertyName][propertyDirection] === `number`
    ? fromValue +
        (transformTo[propertyName][propertyDirection] - fromValue) * progress
    : fromValue;
}

export function createObjectTransformAnimation(obj, transformTo, config) {
  let transformFrom;

  return new Animation({
    func: (progress) => {
      if (!transformFrom) {
        transformFrom = {
          position: {...obj.position},
          rotation: {
            x: obj.rotation.x,
            y: obj.rotation.y,
            z: obj.rotation.z,
          },
          scale: {...obj.scale},
        };
      }

      obj.position.set(
          ...[`x`, `y`, `z`].map((propertyDirection) =>
            getCurrentTransformPropertyByName(
                `position`,
                propertyDirection,
                transformFrom,
                transformTo,
                progress
            )
          )
      );

      obj.rotation.set(
          ...[`x`, `y`, `z`].map((propertyDirection) =>
            getCurrentTransformPropertyByName(
                `rotation`,
                propertyDirection,
                transformFrom,
                transformTo,
                progress
            )
          )
      );
      obj.scale.set(
          ...[`x`, `y`, `z`].map((propertyDirection) =>
            getCurrentTransformPropertyByName(
                `scale`,
                propertyDirection,
                transformFrom,
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
