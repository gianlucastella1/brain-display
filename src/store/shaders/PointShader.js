// Shader for cells

import * as THREE from "three";

const loader = new THREE.TextureLoader();
export let ballimage = loader.load('src/assets/textures/ball.png');
ballimage.magFilter = THREE.LinearFilter;
ballimage.minFilter = THREE.LinearFilter;
ballimage.wrapS = ballimage.wrapT = THREE.RepeatWrapping;

let auraimage = loader.load('src/assets/textures/ballsimple.png');
auraimage.magFilter = THREE.LinearFilter;
auraimage.minFilter = THREE.LinearFilter;
auraimage.wrapS = auraimage.wrapT = THREE.RepeatWrapping;

export let PointShader = {
    uniforms: {
        shaderZoom: { type: "f", value: 700.0 },
        isPersp: { type: "f", value: 1.0 },
        amplitude: { type: "f", value: 1.0 },
        color: { type: "c", value: new THREE.Color( 0xffffff ) },
        texture_: { type: "t", value: ballimage },
        texture_aura: { type: "t", value: auraimage }
    },

    vertexShader: [
        "attribute float size; attribute float ex; attribute float textured;",
        "attribute float caR; attribute float caG; attribute float caB; attribute float caA;",
        "uniform float isPersp; uniform float shaderZoom;",
        "varying vec4 vC; varying float vexist; varying float texed;",
        "void main() {",
            "vC = vec4(caR, caG, caB, caA);",
            "vexist = ex;",
            "texed = textured;",
            "vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );",
            "if(caA < 0.001){return;}",
            "if(isPersp > 0.5){ gl_PointSize = size * ( 150.0 / length( mvPosition.xyz ) ); }",
            "else{              gl_PointSize = size * 100.0 / shaderZoom; }",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}"
        ].join("\n"),

    fragmentShader: [
        "uniform vec3 color; uniform sampler2D texture_; uniform sampler2D texture_aura;",
        "varying vec4 vC; varying float vexist; varying float texed; ",
        "void main() {",
            "if (vexist < 0.001) discard;",
            "vec4 outColor;",
            "if (texed > 0.6){",
                "outColor = texture( texture_, gl_PointCoord );",
            "}",
            "else {",
                "outColor = texture( texture_aura, gl_PointCoord );",
            "}",
            "if (outColor.a < 0.01) discard;",
            "if (texed > 0.1){",
                "gl_FragColor = outColor * vec4( vC.xyz * vexist * vC.a, 1.0 );",
            "}",
            "else{",
                "gl_FragColor = vec4( vC.xyz * vexist * vC.a, 1.0 );",
            "}",
        "}"
        ].join("\n")
};