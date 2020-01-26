#pragma once
#include "ofMain.h"
#include "ButtonController.h"


class ClickCounter: public ofThread
{
public:
	ClickCounter();
	
	void setup(int pinNum);
	int update();

	ButtonController targetButton;
	
	int nClicks;
	uint64_t timerStart;
	bool clicking;
	
	
};