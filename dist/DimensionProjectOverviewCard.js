"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionProjectOverviewCard = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _infoCirclePurpleIcon = _interopRequireDefault(require("./images/infoCirclePurple-icon.svg"));

var _infoCirclePurpleDarkIcon = _interopRequireDefault(require("./images/infoCirclePurpleDark-icon.svg"));

var _SVMHorizontalBarChart = _interopRequireDefault(require("./SVMHorizontalBarChart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DimensionProjectOverviewCard extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleProjectView", () => {
      this.setState(state => ({
        popover: !state.popover
      }));
      this.props.openProjectView();
    });

    this.state = {
      popover: false,
      theme: sessionStorage.getItem("theme")
    };
  }

  render() {
    const {
      boi,
      boiDescription,
      index,
      programDeliveredValue,
      programTargetValue,
      unit
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "tab-content"
    }, /*#__PURE__*/_react.default.createElement("h3", null, index, ") ", boi, /*#__PURE__*/_react.default.createElement("button", {
      id: "Popover1",
      className: "project-details-button",
      onClick: this.toggleProjectView
    }, " ", this.state.theme === "1" ? /*#__PURE__*/_react.default.createElement("img", {
      className: "pr-2",
      src: _infoCirclePurpleDarkIcon.default
    }) : /*#__PURE__*/_react.default.createElement("img", {
      className: "pr-2",
      src: _infoCirclePurpleIcon.default
    }), "Project Details")), /*#__PURE__*/_react.default.createElement("p", null, boiDescription), /*#__PURE__*/_react.default.createElement(_SVMHorizontalBarChart.default, {
      dataset: [programTargetValue, programDeliveredValue],
      labels: ["$ ".concat(programTargetValue), "$ ".concat(programDeliveredValue)],
      unit: unit
    })), /*#__PURE__*/_react.default.createElement("hr", {
      className: "my-2"
    }));
  }

}

exports.DimensionProjectOverviewCard = DimensionProjectOverviewCard;
DimensionProjectOverviewCard.defaultProps = {
  boi: "",
  boiDescription: "",
  programTargetValue: 0,
  programDeliveredValue: 0,
  dataset: [],
  labels: [],
  index: 1,
  openProjectView: () => {},
  unit: "$"
};
DimensionProjectOverviewCard.propTypes = {
  boi: _propTypes.default.string,
  boiDescription: _propTypes.default.string,
  programTargetValue: _propTypes.default.number,
  programDeliveredValue: _propTypes.default.number,
  dataset: _propTypes.default.arrayOf(_propTypes.default.number),
  labels: _propTypes.default.arrayOf(_propTypes.default.string),
  index: _propTypes.default.number,
  openProjectView: _propTypes.default.func,
  unit: _propTypes.default.string
};
var _default = DimensionProjectOverviewCard;
exports.default = _default;