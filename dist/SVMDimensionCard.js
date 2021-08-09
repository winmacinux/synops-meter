"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMDimensionCard = void 0;

var _react = _interopRequireWildcard(require("react"));

var _downArrowIcon = _interopRequireDefault(require("./images/downArrow-icon.svg"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class SVMDimensionCard extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      dimensionName,
      text,
      isActive
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "dimension-card"
    }, /*#__PURE__*/_react.default.createElement("h6", {
      className: "bodytext14-medium-midnight"
    }, dimensionName, " ", isActive && /*#__PURE__*/_react.default.createElement("img", {
      className: "float-right",
      src: _downArrowIcon.default,
      onClick: () => this.props.toggleView(true)
    })), /*#__PURE__*/_react.default.createElement("p", null, text));
  }

}

exports.SVMDimensionCard = SVMDimensionCard;
SVMDimensionCard.defaultProps = {
  isActive: false,
  toggleView: () => {},
  dimensionName: "",
  text: ""
};
SVMDimensionCard.propTypes = {
  isActive: _propTypes.default.bool,
  toggleView: _propTypes.default.func,
  dimensionName: _propTypes.default.string,
  text: _propTypes.default.string
};