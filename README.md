618Cast
=======

This is just a little experimentation with Chromecast development.   
![618Cast Preview](preview.jpg)

### Purpose ###
The purpose of this small app is to provide the residents of apartment
618 with something meaningful to look at as their TV idles in their living
room. Thus, the weather is displayed (to encourage us to stay indoors)
and a task list is displayed.

### Installation ###
The installation of this app is pretty simple. If you have Node/MongoDB
installed, everything should work out of the box. Just run the following
to make sure you have all the dependencies.
```
npm install
```

Then, you will need to customize the location for the weather display.
In order to do this, type your address into [this page](http://itouchmap.com/latlong.html "Lat&Long")
and then insert the latitude and longitude coords into the "cast.html"
file.

### Launching ###
Once it is all setup, you should be able to launch the service using
```
node server.js
```
which will by default launch the 618Cast application on port
9097.
