var $ = require('jquery');
var path = require('path');
var fs = require('fs');

var parseBindAttribute = function (value) {
  var handlers = {};
  var pairs;

  if (value) {
    pairs = value.split(',');
    pairs.forEach(function (pair) {
      var parts = pair.split(':');
      if (parts.length === 2) {
        handlers[parts[0].trim()] = parts[1].trim();
      }
    });
  }

  return Object.keys(handlers).length ? handlers : undefined;
};

var getElementFromTemplatePath = function (templatePath) {
  var absoluteTemplatePath = path.join(process.cwd(), templatePath);
  var file = fs.readFileSync(absoluteTemplatePath, 'utf8');
  return $(file);
};

var EasyView = function (parentElement) {
  if (parentElement) {
    this.render(parentElement);
  }
};

EasyView.prototype.render = function (parent) {
  var element = getElementFromTemplatePath(this.template);
  this.bind(element, this);
  return $(parent).append(element);
};

EasyView.prototype.bind = function (element, scope) {
  var me = this;
  var bindString;
  var handlers;
  var children = element.children();

  if (children.length) {
    children.each(function (i, item) {
      return me.bind($(item), me);
    });
  }

  bindString = element.attr('data-bind');
  handlers = parseBindAttribute(bindString);

  if (handlers) {
    Object.keys(handlers).forEach(function (event) {
      var methodName = handlers[event];
      var method = scope[methodName];

      if (typeof method === 'function') {
        element.on(event, function () {
          method(element);
        });
      } else {
        console.warn('unable to find method "' + methodName + '" in', scope);
      }
    });
  }
};

module.exports = EasyView;
