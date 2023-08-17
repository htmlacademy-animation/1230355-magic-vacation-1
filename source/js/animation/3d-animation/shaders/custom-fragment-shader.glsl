precision mediump float;
#define PI 3.1415

uniform sampler2D map;
uniform float timestamp;

struct Bubble {
    vec2 bubblePosition;
    float bubbleRadius;
};
uniform Bubble bubble1;
uniform Bubble bubble2;
uniform Bubble bubble3;
uniform bool hasBubbles;
uniform float bubbleRadius;

varying vec2 vUv;

vec3 applyHue(vec3 aColor) {
    float duration = 3.0;

    float currentTimePosition = mod(timestamp / 3000.0, duration);
    float currentHueDegrees = 0.0;

    if (currentTimePosition < 0.3) {
        currentHueDegrees = (1.0 - cos((currentTimePosition / 0.3) * PI)) * 8.0;
    } else if (currentTimePosition < 0.6) {
        currentHueDegrees = (1.0 - cos(((currentTimePosition) / 0.3) * PI)) * 6.0 + 2.0;
    } else if (currentTimePosition < 1.0) {
        currentHueDegrees = (1.0 - cos(((currentTimePosition - 0.6) / 0.4) * PI)) * 8.0 + 2.0;
    } else if (currentTimePosition < 1.4) {
        currentHueDegrees = (1.0 - cos(((currentTimePosition - 0.6) / 0.4) * PI)) * 10.0;
    }

    float angle = radians(currentHueDegrees);
    vec3 k = vec3(0.47735);
    float cosAngle = cos(angle);
    return aColor * cosAngle + k * aColor * sin(angle) + k * dot(k, aColor) * (1.0 - cosAngle);
}
vec4 getBorderColor() {
    return texture2D(map, vUv) * vec4(1.0, 1.0, 1.0, 0.15);
}
void drawBubble(inout vec4 outputColor, in Bubble bubble) {
    vec2 currentPosition = vec2(vUv.x * float(IMAGE_ASPECT_RATIO), vUv.y);
    vec2 currentBubblePosition = vec2(bubble.bubblePosition.x * float(IMAGE_ASPECT_RATIO), bubble.bubblePosition.y);
    vec2 fromCurrentPixelToBubblePosition = currentPosition - currentBubblePosition;
    float distanceFromCurrentPixelToBubblePosition = length(currentPosition - currentBubblePosition);
    vec2 shift = vec2(0, 0);
    if (distanceFromCurrentPixelToBubblePosition > bubble.bubbleRadius) {
        return;
    }
    if (distanceFromCurrentPixelToBubblePosition >= bubble.bubbleRadius - BUBBLE_LINE_WIDTH) {
        outputColor = getBorderColor();
        return;
    }
    float highlightRadius = bubble.bubbleRadius * 4.0 / 5.0;
    bool isColorHighlight = distanceFromCurrentPixelToBubblePosition < highlightRadius && distanceFromCurrentPixelToBubblePosition >= highlightRadius - BUBBLE_LINE_WIDTH;
    if (isColorHighlight) {
      vec2 normalizedVectorFromCenterBubbleToLeft = normalize(fromCurrentPixelToBubblePosition);
      vec2 normalizedCurrentBubblePosition = normalize(vec2(0.0, 1.0) - vec2(1.0, 0.0));
      float degree = acos(dot(normalizedVectorFromCenterBubbleToLeft, normalizedCurrentBubblePosition)) * 180.0 / PI;
      if (degree < 15.0) {
        outputColor = getBorderColor();
        return;
      }
    }
    shift = (bubble.bubblePosition - vUv) * (1.0 - sqrt(distanceFromCurrentPixelToBubblePosition / bubble.bubbleRadius));
    outputColor = texture2D(map, vUv + shift);
}
void main() {
    vec4 outputColor = texture2D(map, vUv);
    if (hasBubbles == true) {
        drawBubble(outputColor, bubble1);
        drawBubble(outputColor, bubble2);
        drawBubble(outputColor, bubble3);
    }

    outputColor.rgb = applyHue(outputColor.rgb);

    gl_FragColor = outputColor;
}