# crewapp [![Build Status](https://travis-ci.org/crewapp/crewapp.svg?branch=master)](https://travis-ci.org/crewapp/crewapp) [![Stories in progress](https://badge.waffle.io/crewapp/crewapp.png?label=in%20progress&title=In%20Progress)](https://waffle.io/crewapp/crewapp)
The crew chooses you!

# Installation Directions

 - In the project directory, you should run `npm install`
 - Then make sure you have `grunt-cli`, and run `grunt build`
  - Alternatively, you can run `grunt build-web`, `grunt build-app`

# Environment Variables

### MySQL Database Configuration

| Variables     | Node Variables       | Default Values | Description           |
| :------------ | :------------------- | -------------: | :-------------------- |
| database      | process.env.database | crew           | MySQL database name   |
| username      | process.env.username | root           | MySQL username        |
| password      | process.env.password |                | MySQL user's password |
| hostname      | process.env.hostname | localhost      | MySQL host location   |

### Node.js Server Configuration

| Variables     | Node Variables       | Default Values | Description            |
| :------------ | :------------------- | -------------: | :--------------------- |
| PORT          | process.env.PORT     | 3000           | Port for the webserver |
| CHATPORT      | process.env.CHATPORT | 5000           | Port for socket.io     |
