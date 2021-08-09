"use strict";

require("core-js/modules/es.object.assign.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMDimensionListView = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _downArrowIcon = _interopRequireDefault(require("./images/downArrow-icon.svg"));

var _DotLabels = _interopRequireDefault(require("./DotLabels"));

var _DimensionDetailsCard = _interopRequireDefault(require("./DimensionDetailsCard"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SVMDimensionListView extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleExpandedDimensionView", () => {
      this.setState(state => ({
        showExpandedDimension: !state.showExpandedDimension
      }));
      this.props.toggleView(!this.state.showExpandedDimension);
    });

    this.state = {
      showExpandedDimension: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expand !== this.props.expand) {
      console.log(this.props.expand);
      this.setState({
        showExpandedDimension: this.props.expand
      });
    }
  }

  render() {
    const {
      dimensionName,
      dimension,
      programId,
      fiscalYear,
      server,
      isActive
    } = this.props;
    const {
      showExpandedDimension
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, showExpandedDimension ? /*#__PURE__*/_react.default.createElement("div", {
      className: "details-view-section mb-3"
    }, /*#__PURE__*/_react.default.createElement(_DotLabels.default, null), /*#__PURE__*/_react.default.createElement(_DimensionDetailsCard.default, _extends({
      server: server,
      fiscalYear: fiscalYear,
      programId: programId
    }, dimension, {
      onClose: this.toggleExpandedDimensionView
    }))) : /*#__PURE__*/_react.default.createElement("div", {
      className: "list-card",
      onClick: this.toggleExpandedDimensionView
    }, /*#__PURE__*/_react.default.createElement("h6", {
      className: "bodytext14-medium-midnight"
    }, dimensionName, " ", isActive && /*#__PURE__*/_react.default.createElement("img", {
      className: "float-right",
      src: _downArrowIcon.default
    }))));
  }

}

exports.SVMDimensionListView = SVMDimensionListView;
SVMDimensionListView.defaultProps = {
  isActive: false,
  server: null,
  expand: null,
  programId: null,
  fiscalYear: null,
  dimensionName: "",
  dimension: null,
  text: "",
  toggleView: () => {}
};
SVMDimensionListView.propTypes = {
  isActive: _propTypes.default.bool,
  server: _propTypes.default.string,
  expand: _propTypes.default.bool,
  programId: _propTypes.default.string,
  fiscalYear: _propTypes.default.string,
  dimensionName: _propTypes.default.string,
  dimension: _propTypes.default.object,
  text: _propTypes.default.string,
  toggleView: _propTypes.default.func
};