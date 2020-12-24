const config = require('./config');
const AppLoader = require('./app');

(new AppLoader(config)).bootUp();
