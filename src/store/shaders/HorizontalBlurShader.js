/**
 * @author zz85 / http://www.lab4games.net/zz85/blog
 *
 * Two pass Gaussian blur filter (horizontal and vertical blur shaders)
 * - described in http://www.gamerendering.com/2008/10/11/gaussian-blur-filter-shader/
 *   and used in http://www.cake23.de/traveling-wavefronts-lit-up.html
 *
 * - 9 samples per pass
 * - standard deviation 2.7
 * - "h" and "v" parameters should be set to "1 / width" and "1 / height"
 */

export let HorizontalBlurShader = {
	uniforms: {
		"tDiffuse": { type: "t", value: null },
		"h":        { type: "f", value: 1.0 / 512.0 },
        "inv":      { type: "f", value: 1.0 }
	},

	vertexShader: [
		"varying vec2 vUv;",
		"void main() {",
			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
		"}"

	].join("\n"),

	fragmentShader: [
		"uniform sampler2D tDiffuse;",
		"uniform float h;",
		"uniform float inv;",
		"varying vec2 vUv;",
		"void main() {",
			"vec4 sum = vec4( 0.0 );",
			"sum += texture( tDiffuse, vec2( vUv.x - 8.0 * h, vUv.y ) ) * 0.03414088;",
			"sum += texture( tDiffuse, vec2( vUv.x - 7.0 * h, vUv.y ) ) * 0.04132557;",
			"sum += texture( tDiffuse, vec2( vUv.x - 6.0 * h, vUv.y ) ) * 0.0487645;",
			"sum += texture( tDiffuse, vec2( vUv.x - 5.0 * h, vUv.y ) ) * 0.05609569;",
			"sum += texture( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.06290657;",
			"sum += texture( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.06877067;",
			"sum += texture( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.07329111;",
			"sum += texture( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.07614478;",
			"sum += texture( tDiffuse, vec2( vUv.x          , vUv.y ) ) * 0.07712048;",
			"sum += texture( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.07614478;",
			"sum += texture( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.07329111;",
			"sum += texture( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.06877067;",
			"sum += texture( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.06290657;",
			"sum += texture( tDiffuse, vec2( vUv.x + 5.0 * h, vUv.y ) ) * 0.05609569;",
			"sum += texture( tDiffuse, vec2( vUv.x + 6.0 * h, vUv.y ) ) * 0.0487645;",
			"sum += texture( tDiffuse, vec2( vUv.x + 7.0 * h, vUv.y ) ) * 0.04132557;",
			"sum += texture( tDiffuse, vec2( vUv.x + 8.0 * h, vUv.y ) ) * 0.03414088;",
			"if(inv>0.0){ gl_FragColor = sum; }",
			"else{        gl_FragColor = 1.0-sum; }",
		"}"
	].join("\n")
};
