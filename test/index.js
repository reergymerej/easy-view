var will = require('willy').will;
var app = require('../lib/EasyView');

describe('sanity', function () {
  it('should load', function () {
    will(app).exist();
  });
});
