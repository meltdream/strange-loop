
precision highp float;

uniform sampler2D tex0;

uniform float in1;

uniform float in2;

uniform float dispX;

uniform float dispY;



varying vec2 texCoordVarying;

vec3 hueShift(vec3 color, float hueAdjust, float power){
    //implemented by mairod

    vec3  kRGBToYPrime = vec3 (0.299, 0.587, 0.114);
    vec3  kRGBToI      = vec3(0.596, -0.275, -0.321);
    vec3  kRGBToQ      = vec3(0.212, -0.523, 0.311);

    vec3  kYIQToR     = vec3(1.0, 0.956, 0.621);
    vec3  kYIQToG     = vec3(1.0, -0.272, -0.647);
    vec3  kYIQToB     = vec3(1.0, -1.107, 1.704);

    float   YPrime  = dot(color, kRGBToYPrime);
    float   I       = dot(color, kRGBToI);
    float   Q       = dot(color, kRGBToQ);
    float   hue     = atan(Q, I);
    float   chroma  = sqrt(I * I + Q * Q);
    
    chroma = fract(pow((chroma),power));

    hue += hueAdjust;

    Q = chroma * sin(hue);
    I = chroma * cos(hue);

    vec3    yIQ   = vec3(YPrime, I, Q);

    return vec3(dot(yIQ, kYIQToR), dot(yIQ, kYIQToG), dot(yIQ, kYIQToB));
   	

}




void main(){
	vec4 color = texture2D(tex0, texCoordVarying + vec2(dispX, dispY));
	
	float in1Scaled = in1 * 3.0;
	
	float in2Scaled = (in2*0.6) + 0.2;
	
	gl_FragColor = vec4(hueShift(color.xyz, in1Scaled, in2Scaled),1.0);

}





