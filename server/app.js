// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const RouteDefinitions = require('./lib/routes/definitions');
const Authenticator = require('./lib/middlewares/authenticate');

class AppLoader {
  constructor(config) {
    this.config = config;
    this.app = express();
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(bodyParser.json());
    this.app.use(Authenticator(config));
  }
  
  bootUp() {
    this.registerRoutes();
    this.startListening();
  }
  
  registerRoutes() {
    RouteDefinitions.register(this.app, this.config);
  }
  
  startListening() {
    this.app.listen(5000, (err) => {
      if (err) {
        console.log(err.message);
        process.exit(1);
      }
      console.log('Listening');
    });
  }
}

module.exports = AppLoader;
