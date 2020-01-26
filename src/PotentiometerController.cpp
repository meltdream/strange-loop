#include "PotentiometerController.h"

PotentiometerController::PotentiometerController()
{
	isReady = false;
        didPotChange = false;
	changeAmount = 0;
	lastPotValue = 0;
	potValue = 0;
    //10k trim pot connected to adc #0
	potentiometerInput = 1;
}


bool PotentiometerController::setup(int pinNum)
{      
	potentiometerInput = pinNum;
	int status = wiringPiSPISetup(0, 1000000);
	if (status != -1)
	{
		ofLogVerbose() << "wiringPiSetup PASS";
		isReady = true;
	}else 
	{
		ofLogError() << "wiringPiSetup FAIL status: " << status;
	}
	
	if (isReady) 
	{
		startThread();
	}
	return isReady;
}


void PotentiometerController::threadedFunction()
{
	while (isThreadRunning()) 
	{
		didPotChange = false;
		
		potValue = readAnalogDigitalConvertor();
		changeAmount = abs(potValue - lastPotValue);
        
		if(changeAmount!=0)
        {
            didPotChange = true;
        }
        
		lastPotValue = potValue;
        sleep(10);
	}
}

int  PotentiometerController::readAnalogDigitalConvertor()
{
	uint8_t buffer[3];
    
	buffer[0] = 1;
	buffer[1] = (8+potentiometerInput)<<4;
	buffer[2] = 0;
    
	wiringPiSPIDataRW(0, buffer, 3);
    
	return ((buffer[1]&3) << 8) + buffer[2];
}