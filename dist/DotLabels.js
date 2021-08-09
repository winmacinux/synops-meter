"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DotLabels = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./css/SVM.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class DotLabels extends _react.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "status-list"
    }, /*#__PURE__*/_react.default.createElement("ul", null, items === null || items === void 0 ? void 0 : items.map((o, i) => /*#__PURE__*/_react.default.createElement("li", {
      key: "svm-dot-dimnesion-labels-".concat(i)
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "dot dot-purple",
      style: {
        background: o.color
      }
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "bodytext14-medium-midnight"
    }, o.label)))));
  }

}

exports.DotLabels = DotLabels;
DotLabels.defaultProps = {
  items: [{
    color: "rgb(117, 0, 192)",
    label: "Identified Value"
  }, {
    color: "rgb(133, 215, 255)",
    label: "Delivered Value"
  }]
};
DotLabels.propTypes = {
  items: _propTypes.default.arrayOf(_propTypes.default.shape({
    color: _propTypes.default.string,
    label: _propTypes.default.string
  }))
};
var _default = DotLabels;
exports.default = _default;