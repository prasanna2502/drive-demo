const BaseHelper = require('../common/base-helper');
const GoogleAdapter = require('../adapter/google');
const Errors = require('../common/errors');

class AdapterFactory extends BaseHelper {
  constructor(config, req) {
    super(config, req);
    this.req = req;
  }
  
  getAdapterInstance(adapterName) {
    switch (adapterName) {
      case 'google':
        return new GoogleAdapter(this.config, this.req);
      default:
        throw Errors.UndefinedAdapter;
    }
  }
}

module.exports = AdapterFactory;
