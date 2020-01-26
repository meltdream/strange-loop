#include "ClickCounter.h"

ClickCounter::ClickCounter()
{
	nClicks = 0;
	timerStart = 0;
	clicking = false;
}

void ClickCounter::setup(int pinNum){
	targetButton.setup(pinNum);
}

int ClickCounter::update()
{	
	targetButton.lock();
	
	if (targetButton.wasPressed()){
		if(!clicking){
			clicking = true;
			nClicks = 0;
		}
		if(clicking){
			nClicks++;
			timerStart = ofGetSystemTimeMillis();
		}
	}
	
	targetButton.unlock();

	if (ofGetSystemTimeMillis() - timerStart > 500 && timerStart > 0){
		timerStart = 0;
		clicking = false;
		return nClicks;
	}
	else{
			return 0;
	}

}

