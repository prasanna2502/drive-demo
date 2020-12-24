const _ = require('lodash');
const Constants = require('./constants');
const Errors = require('./errors');

class BaseHelper {
  constructor(config, req) {
    this.config = config;
    this.headers = req.headers;
    this.cookies = req.cookies;
    this.credential = _.get(this.headers, 'x-drive-credential');
  }
  
  getAuthTokens() {
    return _.get(this.credential, 't', null);
  }
  
  getRootFolder() {
    return _.get(this.credential, 'r', null);
  }
  
  _enrichError(e) {}
  
  sendErrorResponse(e, res) {
    this._enrichError(e);
    console.log(`message: ${e.message}, stack: ${e.stack}`);
    let code = e.code || Errors.UnExpectedError.code;
    let responseBody = {
      message: _.get(e, 'response.statusText') || e.statusText || e.message,
      data: _.get(e, 'data.errors') || _.get(e, 'errors') || {}
    }
    
    if (Number.parseInt(e.code) === 401)
      res.clearCookie(Constants.Cookies.SessionIdCookieName);
    res.status(code).send(responseBody);
  }
  
  //TODO: Add logging
}

module.exports = BaseHelper;
