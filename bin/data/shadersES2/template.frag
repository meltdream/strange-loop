
precision highp float;

uniform sampler2D tex0;
//in1 and in2 are linked to the third knob and
// the left/right axis of the analog, they go from
// 0.0 to 1.0
uniform float in1; 

uniform float in2;
//dispX and dispY move the framebuffer, they are linked
//to the left analog two axis.
uniform float dispX;

uniform float dispY;

varying vec2 texCoordVarying;





void main(){
	//contrast
	vec4 color = texture2D(tex0, texCoordVarying+vec2(dispX, dispY));
	float in1Scaled = (in1 * /*some value*/ ) + /*some value*/;  
	float in2Scaled = 
	
	color.rgb = /* do something with the two scaled and biased inputs*/;
	gl_FragColor = color;
	

}





