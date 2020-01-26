
precision highp float;

uniform sampler2D tex0;

uniform float th1;

uniform float op1;

varying vec2 texCoordVarying;


//SOFT LUMA KEY
//"CREDIT": "by IMIMOT (ported from http://www.memo.tv/)",

void main(){
	vec4 pix = texture2D(tex0, texCoordVarying);
	float th1Scaled = (th1 * 1.7) - 0.85;
	float fValue = (pix.r *0.29+ pix.g*0.6 + pix.b*0.11);
	float l1 = abs(th1Scaled) - 0.09;
	float l2 = l1 + 0.09;
	float bw_sel = step(th1Scaled, 0.0); 
	fValue = smoothstep(max(l1,0.0), min(l2, 1.0), abs(bw_sel - fValue));	
	pix.a = fValue;
     
    	// final mix needed to make alpha working
    	vec4 color = mix(vec4(pix.rgb, 0.0),pix,pix.a);
    	gl_FragColor = vec4(mix(color.rgb, 1.0-color.rgb, 1.0 - pix.a), color.w + op1);
    

}





