"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OriginResult = exports.ExceptionMap = exports.IconMap = void 0;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _configProvider = require("../config-provider");

var _icon = _interopRequireDefault(require("../icon"));

var _noFound = _interopRequireDefault(require("./noFound"));

var _serverError = _interopRequireDefault(require("./serverError"));

var _unauthorized = _interopRequireDefault(require("./unauthorized"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var IconMap = {
  success: 'check-circle',
  error: 'close-circle',
  info: 'exclamation-circle',
  warning: 'warning'
};
exports.IconMap = IconMap;
var ExceptionMap = {
  '404': _noFound["default"],
  '500': _serverError["default"],
  '403': _unauthorized["default"]
}; // ExceptionImageMap keys

exports.ExceptionMap = ExceptionMap;
var ExceptionStatus = Object.keys(ExceptionMap);
/**
 * render icon
 * if ExceptionStatus includes ,render svg image
 * else render iconNode
 * @param prefixCls
 * @param {status, icon}
 */

var renderIcon = function renderIcon(prefixCls, _ref) {
  var status = _ref.status,
      icon = _ref.icon;
  var className = (0, _classnames["default"])("".concat(prefixCls, "-icon"));

  if (ExceptionStatus.includes(status)) {
    var SVGComponent = ExceptionMap[status];
    return React.createElement("div", {
      className: "".concat(className, " ").concat(prefixCls, "-image")
    }, React.createElement(SVGComponent, null));
  }

  var iconString = IconMap[status];
  var iconNode = icon || React.createElement(_icon["default"], {
    type: iconString,
    theme: "filled"
  });
  return React.createElement("div", {
    className: className
  }, iconNode);
};

var renderExtra = function renderExtra(prefixCls, _ref2) {
  var extra = _ref2.extra;
  return extra && React.createElement("div", {
    className: "".concat(prefixCls, "-extra")
  }, extra);
};

var OriginResult = function OriginResult(props) {
  return React.createElement(_configProvider.ConfigConsumer, null, function (_ref3) {
    var getPrefixCls = _ref3.getPrefixCls;
    var customizePrefixCls = props.prefixCls,
        customizeClassName = props.className,
        subTitle = props.subTitle,
        title = props.title,
        style = props.style,
        children = props.children,
        status = props.status;
    var prefixCls = getPrefixCls('result', customizePrefixCls);
    var className = (0, _classnames["default"])(prefixCls, "".concat(prefixCls, "-").concat(status), customizeClassName);
    return React.createElement("div", {
      className: className,
      style: style
    }, renderIcon(prefixCls, props), React.createElement("div", {
      className: "".concat(prefixCls, "-title")
    }, title), subTitle && React.createElement("div", {
      className: "".concat(prefixCls, "-subtitle")
    }, subTitle), children && React.createElement("div", {
      className: "".concat(prefixCls, "-content")
    }, children), renderExtra(prefixCls, props));
  });
};

exports.OriginResult = OriginResult;
OriginResult.defaultProps = {
  status: 'info'
};
var Result = OriginResult;
ExceptionStatus.forEach(function (key) {
  var privateKey = "PRESENTED_IMAGE_".concat(key);
  Result[privateKey] = ExceptionMap[key];
});
var _default = Result;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
