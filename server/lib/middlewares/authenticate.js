const CryptoJS = require('crypto-js');
const Constants = require('../common/constants');

module.exports = function (config) {
  let authenticator = (req, res, next) => {
    let sessionCookie = req.cookies[`${Constants.Cookies.SessionIdCookieName}`];
    if (sessionCookie) {
      try {
        let bytes = CryptoJS.AES.decrypt(sessionCookie, config.sessionSecretKey);
        req.headers['x-drive-credential'] = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      } catch (e) {
        console.log(`${e.message},${e.stack}`);
        res.clearCookie(Constants.Cookies.SessionIdCookieName);
      }
    }
    next();
  }
  return authenticator;
}
