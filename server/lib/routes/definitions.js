const _ = require('lodash');
const AuthService = require('../services/auth');
const DriveService = require('../services/drive');
const Constants = require('../common/constants');
class Definitions{ 
  static register(app, config) {
    app.get('/initiate-login', (req, res) => {
      let authService = new AuthService(config, req);
      try {
        let result = authService.initiateLogin();
        res.send(result);
      } catch (e) {
        authService.sendErrorResponse(e, res);
      }
    });
    
    app.get('/after-login', async (req, res) => {
      let authService = new AuthService(config, req);
      try {
        let { profile, sessionIdCookie } = await authService.afterLogin(req.query.code);
        res.cookie(Constants.Cookies.SessionIdCookieName, sessionIdCookie, Constants.CookieOptions.SessionIdCookie);
        res.send(profile);
      } catch (e) {
        authService.sendErrorResponse(e, res);
      }
    });
    
    app.post('/logout', async (req, res) => {
      let authService = new AuthService(config, req);
      try {
        await authService.logout();
        res.clearCookie(Constants.Cookies.SessionIdCookieName);
        res.send({ loggedOut: true });
      } catch (e) {
        authService.sendErrorResponse(e, res);
      }
    });
    
    app.get('/drive/user-profile', async (req, res) => {
      let authService = new AuthService(config, req);
      try {
        let profile = await authService.getProfile();
        res.send(profile);
      } catch (e) {
        authService.sendErrorResponse(e, res);
      }
    });
    
    app.get('/drive/files', async (req, res) => {
      let driveService = new DriveService(config, req);
      try {
        let files = await driveService.getFiles(req.query);
        res.send(files);
      } catch (e) {
        driveService.sendErrorResponse(e, res);
      }
    });
    
    app.put('/drive/files/:fileId/permissions/transfer-ownership', async (req, res) => {
      let driveService = new DriveService(config, req);
      let fileId = req.params.fileId;
      try {
        let updatedPermission = await driveService.transferOwnerShip(fileId, req.body);
        res.send(updatedPermission);  
      } catch (e) {
        driveService.sendErrorResponse(e, res);
      }
    });
  }
}

module.exports = Definitions;
