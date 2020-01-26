#include "ofMain.h"
#include "ofApp.h"


int main( ){


    ofGLESWindowSettings settings;
    //uncomment for PAL Systems->
    //settings.setSize(720, 576);
    //uncomment for NTSC Systems->
    settings.setSize(720, 480);
    settings.windowMode = OF_GAME_MODE;
    settings.setGLESVersion(2);
    ofCreateWindow(settings);
    ofRunApp(new ofApp());

}
