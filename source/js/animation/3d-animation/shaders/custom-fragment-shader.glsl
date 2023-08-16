precision mediump float;

uniform sampler2D map;
uniform float delta;

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

vec3 applyHue(vec3 aColor, float aHue) {
    float angle = radians(aHue);
    vec3 k = vec3(0.57735, 0.57735, 0.57735);
    float cosAngle = cos(angle);
    return aColor * cosAngle + k * aColor * sin(angle) + k * dot(k, aColor) * (1.0 - cosAngle);
}

void drawBubble(inout vec4 outputColor, in Bubble bubble) {
    vec2 currentPosition = vec2(vUv.x * float(IMAGE_ASPECT_RATIO), vUv.y);
    vec2 currentBubblePosition = vec2(bubble.bubblePosition.x * float(IMAGE_ASPECT_RATIO), bubble.bubblePosition.y);

    float distanceFromCurrentPixelToBubblePosition = length(currentPosition - currentBubblePosition);

    vec2 shift = vec2(0, 0);

    if (distanceFromCurrentPixelToBubblePosition > bubble.bubbleRadius) {
        return;
    }

    if (distanceFromCurrentPixelToBubblePosition >= bubble.bubbleRadius - BUBBLE_LINE_WIDTH) {
        float gray = 0.8;
        outputColor.rgb = vec3(gray, gray, gray);
        return;
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

    outputColor.rgb = applyHue(outputColor.rgb, delta);

    gl_FragColor = outputColor;
}
