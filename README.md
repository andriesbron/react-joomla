# Joomla React integration demo

This is a very simple component for demonstrating the integration of React in a joomla extension.

Build the zip using instructions, then install in backend, and create a menu item to see the app in frontend.

## Build instructions
Clone locally then run following commands
```
npm install
npm install @types/react
sudo npm install tsd -g
tsd reinstall
gulp release
```
this should build the zip in the release folder.

Optionally, you can edit gulp-config.dist.json and save as gulp-config.json to run `gulp` copy && watch to your local joomla install.
