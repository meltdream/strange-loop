#pragma once
#include "ofMain.h"
#include <wiringPi.h>

class ButtonController: public ofThread
{
public:
	ButtonController();
	bool setup(int pinNum);
	void threadedFunction();
	bool wasPressed();
	
	bool readButton();
	int buttonInput;
	

	bool isPressed, currentValue, oldValue, outputValue;
	bool isReady;
	
};