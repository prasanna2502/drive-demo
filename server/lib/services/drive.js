const BaseHelper = require('../common/base-helper');
const AdapterFactory = require('../adapter/adapter-factory');
const Constants = require('../common/constants');

class DriveService extends BaseHelper {
  constructor(config, req) {
    super(config, req);
    this.adapterFactory = new AdapterFactory(config, req);
  }
  
  async getFiles(query) {
    let adapter = this.adapterFactory.getAdapterInstance(Constants.DefaultAdapter);
    return await adapter.getFiles(query);
  }
  
  async transferOwnerShip(fileId, payload) {
    let adapter = this.adapterFactory.getAdapterInstance(Constants.DefaultAdapter);
    return await adapter.transferOwnerShip(fileId, payload.newOwner);
  }
}

module.exports = DriveService;
