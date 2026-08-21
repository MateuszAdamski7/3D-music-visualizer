varying vec2 vUv;
uniform float uTime;

void main() {

    vec2 grid = abs(fract(vUv * 30.0));


    gl_FragColor = vec4(grid.x, grid.y, 1.0, 0.5);
}§