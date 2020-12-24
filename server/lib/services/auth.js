const BaseHelper = require('../common/base-helper');
const AdapterFactory = require('../adapter/adapter-factory');
const Constants = require('../common/constants');
const _ = require('lodash');
const CryptoJS = require('crypto-js');

class AuthService extends BaseHelper {
  constructor(config, req) {
    super(config, req);
    this.adapterFactory = new AdapterFactory(config, req);
  }
  
  initiateLogin() {
    let adapter = this.adapterFactory.getAdapterInstance(Constants.DefaultAdapter);
    let authUrl = adapter.generateAuthUrl();
    return {authUrl: authUrl}
  }
  
  async afterLogin(code) {
    let adapter = this.adapterFactory.getAdapterInstance(Constants.DefaultAdapter);
    let tokens = await adapter.completeLogin(code);
    let profile = await adapter.getProfile();
    let sessionCookie = CryptoJS.AES.encrypt(JSON.stringify({ t: tokens, r: profile.rootFolderId }), this.config.sessionSecretKey).toString();
    return {
      sessionIdCookie: sessionCookie,
      profile: _.omit(profile, ['rootFolderId'])
    };
  }
  
  async logout() {}
  
  async getProfile() {
    let adapter = this.adapterFactory.getAdapterInstance(Constants.DefaultAdapter);
    let profile = await adapter.getProfile();
    return profile;
  }
}

module.exports = AuthService;
