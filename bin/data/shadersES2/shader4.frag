
precision highp float;

uniform sampler2D tex0;

uniform float in1;

uniform float in2;

uniform float textureWidth;

uniform float textureHeight;

uniform float dispX;

uniform float dispY;



uniform float amount;


varying vec2 texCoordVarying;

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec4 wrapSat(vec4 inp, float amount){
	vec4 color = vec4(0.0, 0.0, 0.0, 0.0);
	vec4 toHsv = vec4(rgb2hsv(inp.xyz), inp.w);
	float newHue = toHsv.y + (amount/10.0);
	newHue = abs(newHue);
	newHue = fract(newHue);
	
	color = vec4(toHsv.x, newHue, toHsv.z, toHsv.w);
	return vec4(hsv2rgb(color.xyz), color.w);
}



void main(){
	//pixelated

	float in1Scaled = in1 * 8.0;
	float in2Scaled = (in2*0.8) + 0.1;
	vec3 tc = vec3(1.0, 0.0, 0.0);
	
	float dx = (1.0+in1Scaled)*(1./textureWidth);
	float dy = (1.0+in1Scaled)*(1./textureHeight);
	vec2 coord = vec2(dx*floor((texCoordVarying.x+dispX)/dx),
	              dy*floor((texCoordVarying.y+dispY)/dy));
	
	tc = texture2D(tex0, coord).rgb;
	gl_FragColor = wrapSat(vec4(tc, 1.0), in2Scaled);

  	

}





