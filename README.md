# INTRODUCTION

This is a responsive website that displays the **weather conditions** of cities across the world.
## Getting started

 1. Clone the repository. 
 2. Open this project in VS code (preferable).
 3.  Set up local HTTP server.
 4.  Run index.html file in any web browser (Chrome preferable).

## Setting up local HTTP server.
>Prerequisites :\
-Install NodeJS 
-Run these commands in the terminal.\
`$ npm install express`\
`$ npm install -g require`\
`$ npm install body-parser`

 - This project contains two API servers written in NodeJS under **nodeScripts** folder.
 - nodeHTTPServer.js uses built-in HTTP module and nodeExpress.js uses express module to create an API server.
 - To run nodeHTTPServer.js change scripts/weatherInfo/api.js:32 line to false and run using `$node nodeHTTPServer.js`
 - To run nodeExpress.js change scripts/weatherInfo/api.js:32 line to true and run using `$node nodeExpress.js`
## SECTIONS :
In this website you'll find three sections.
1. In top section the weather conditions for the selected city along with current date, time, icon and weather forecast information can be seen.
2. In the middle section the weather condition of listed cities based on user's preference are displayed in a card layout.
3. In the bottom section the summary measurements of a list of given cities are displayed.

## TOP SECTION :
If a city is selected in the drop down box, the current Date and Time for the selected city is displayed.The current Temperature in Celsius and Fahrenheit, Humidity and precipitation values for the selected city and also the weather conditions for the next 4 hours with temperature value is displayed.

## MIDDLE SECTION:
The middle section shows the preference selection icons such as sunny/cold/rainy. Based on the preference selected, city name, current date and time along with city's temperature, precipitation and humidity levels with corresponding icons is shown in the screen which is horizontally scroll-able.

## BOTTOM SECTION:

In the bottom section the weather status as a summary for the given list of cities is displaye with a combined sorting option for name and temperature.
The continent name sorting will sort the entire list of cities whereas the temperature sort will sort within the subset of cities under the same continent.