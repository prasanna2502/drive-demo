const BaseHelper = require('../common/base-helper');
const Constants = require('../common/constants');
const { google } = require('googleapis');
const _ = require('lodash');

class GoogleAdapter extends BaseHelper {
  constructor(config, req) {
    super(config, req);
    this.authClient = null;
  }
  
  getAuthClient() {
    if (!this.authClient) {
      let baseUrl = this.config.baseUrl || `http://${Constants.DefaultHostName}`;
      this.authClient = new google.auth.OAuth2(
        this.config.google.clientId,
        this.config.google.clientSecret,
        `${baseUrl}${Constants.RedirectUri}`
      );
      
      let authTokens = this.getAuthTokens();
      
      if (authTokens)
        this.authClient.setCredentials(authTokens);
    }
    
    return this.authClient;
  }
  
  getDriveClient(v = 'v3') {
    let authClient = this.getAuthClient();
    if (!this.driveClient) {
      this.driveClient = google.drive({ version: v, auth: authClient });
    }
    return this.driveClient;
  }
  
  generateAuthUrl() {
    try {
      let client = this.getAuthClient();
      let authUrl = client.generateAuthUrl({
        access_type: Constants.GoogleConstants.AccessType,
        scope: Constants.GoogleConstants.LoginScope
      });
      return authUrl;
    } catch (e) {
      this._parseError(e);
    }
  }
  
  async completeLogin(code) {
    let tokens = this._getAccessTokens(code);
    return tokens;
  }
  
  async getProfile() {
    try {
      const driveClient = this.getDriveClient('v2');
      let profile = await driveClient.about.get();
      return _.pick(profile.data, ['user', 'rootFolderId']);  
    } catch (e) {
      this._parseError(e);
    }
  }
  
  async getFiles(options) {
    try {
      const driveClient = this.getDriveClient();
      let queryParams = {
        fields: Constants.GoogleConstants.DriveFileFields,
        orderBy: options.orderBy || Constants.GoogleConstants.DefaultFileOrderby,
        pageSize: options.pageSize || 30,
        q: this._constructSearchQuery(options)
      };
      if (!_.isEmpty(options.pageToken))
        queryParams.pageToken = options.pageToken;  
      let files = await driveClient.files.list(queryParams);
      return files.data;
    } catch (e) {
      this._parseError(e);
    }
  }
  
  _constructSearchQuery(options) {
    let q = [];
    if (!_.isEmpty(options.sharedWithMe)) {
      q.push(`sharedWithMe = true`);
      if (!_.isEmpty(options.parentFolder))
        q.push(`'${options.parentFolder}' in parents`);
    } else {
      let parentFolder = !_.isEmpty(options.parentFolder) ? options.parentFolder : this.getRootFolder();
      q.push(`'${parentFolder}' in parents`);
    }
    return q.join(" AND ");
  }
  
  async transferOwnerShip(fileId, newOwner) {
    const driveClient = this.getDriveClient();
    try {
      let result = await driveClient.permissions.create({
        resource: Object.assign(newOwner, { role: Constants.GoogleConstants.OwnerPermission }),
        fileId: fileId,
        transferOwnership: true
      });
      return result.data;
    } catch (e) {
      this._parseError(e);
    }
  }
  
  _parseError(e) {
    if (Constants.GoogleConstants.ErrorEnums[e.message]) {
      throw Constants.GoogleConstants.ErrorEnums[e.message];
    }
    throw e;
  }
  
  async _getAccessTokens(code) {
    try {
      let client = this.getAuthClient();
      let t = await client.getToken(code);
      client.setCredentials(t.tokens);
      return t.tokens;
    } catch (e) {
      this._parseError(e);
    }
  }
  
}

module.exports = GoogleAdapter;
