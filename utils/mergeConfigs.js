
const path = require('path');
const deepExtend = require('deep-extend');

module.exports = function(config, defaults) {
  try {
    const pkg = require(path.join(process.cwd(), 'package.json'));
    return deepExtend({}, defaults, pkg.mrmConfig || {}, config);
  }
  catch {
    return deepExtend({}, defaults, config);
  }
}
