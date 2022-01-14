# About Strange Loop
The Strange Loop is a digital feedback processor based on openFrameworks and the Raspberry Pi.
It allows the user to control several parameters of the feedback loop that are fixed or
difficult to alter in standard video mixer feedback, with an embedded control interface consisting of
two clickable joystick and four potentiometers.

![Strange Loop Image](https://github.com/meltdream/strange-loop/blob/master/Strange_Loop_img.jpg)


You can find out how it is operated in this user manual: https://drive.google.com/open?id=1mWpbdJPXsI3qJzNyc-diBiNdgp5EbQMr

Here you can find the images ready to flash, however you will need the control board to be able to alter the parameters.

NTSC: https://drive.google.com/file/d/1cvRweDf2ZeVs3AgomEAA5YKOnh6GvCOu/view?usp=sharing

PAL: https://drive.google.com/open?id=1eWtjTwCZFYJ5HNEiKDyOCo849Sxr1fft

### Modifying it:

If you feel adventurous, you can edit the code running on your unit to do different stuff.
This will require a little experience in programming, but it's actually not that hard.

You will need a USB keyboard and some patience. First, connect the USB keyboard to your device and hit "Esc"
to close the application. 
You will now be able to enter commands to the Raspbian console.
Now you can either edit the file directly from the console, or connect to your Wi-Fi network, switch to Desktop Autologin from Boot Options and use VNC Viewer to work from your laptop. I strongly recommend the latter if you have to do substantial work.

Here's a tutorial for using VNC: (VNC is already enabled, just make sure to change the Wi-Fi country)
https://www.raspberrypi.org/documentation/remote-access/vnc/

The shaders are the easiest parts to modify probably, and they compile at run time, meaning that you 
won't have to recompile the project each time you alter them, just reboot the device and the new code will run.
You can find a shader template in the shadersES2 folder if you wanna write one from scratch.

If you wanna change the behavior of the controls, add new effects or new functionality, you will need to work on ofApp.cpp and ofApp.h, then when you're finished you'll have to recompile the project by running the " make " command from the projects directory.
If something goes wrong and your unit stops booting correctly, just reflash the SD and you will be up and running again.








