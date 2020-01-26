#include "ButtonController.h"

ButtonController::ButtonController()
{
	isReady = false;
	
	isPressed = false;
	
	currentValue = false;
	
	oldValue = false;

	buttonInput = -1;
}


bool ButtonController::setup(int pinNum)
{      
	buttonInput = pinNum;
	int status = wiringPiSetup();
	if (status != -1)
	{
		ofLogVerbose() << "wiringPiSetup PASS";
		isReady = true;
		pinMode(buttonInput, INPUT);
		pullUpDnControl(buttonInput, PUD_UP);
	}else 
	{
		ofLogError() << "wiringPiSetup FAIL status: " << status;
	}
	
	if (isReady) 
	{
		startThread(true);
	}
	return isReady;
}


void ButtonController::threadedFunction()
{
	while (isThreadRunning()) 
	{	
		lock();
		currentValue = readButton();
		//once the button is de-pressed, 
		//is Pressed remains true until it's read by wasPressed()
		if(currentValue != oldValue && oldValue){
			isPressed = true;
			
		}
		oldValue = currentValue;
		
		unlock();
		sleep(10);
		
		
        
       
	}
}

bool ButtonController::wasPressed(){
	outputValue = isPressed;
	isPressed = false;
	return outputValue;
}

bool ButtonController::readButton()
{	
	
	if (digitalRead(buttonInput) == 0)
		return   true;
	else
		return false;
}