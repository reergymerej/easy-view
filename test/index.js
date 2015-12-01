var will = require('willy').will;
var EasyView = require('../lib/EasyView');

describe('sanity', function () {
  it('should load', function () {
    will(EasyView).exist();
  });
});
