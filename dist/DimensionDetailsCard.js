"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DimensionDetailsCard = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _upArrowIcon = _interopRequireDefault(require("./images/upArrow-icon.svg"));

var _reactBootstrap = require("react-bootstrap");

var _DimensionProjectOverviewCard = _interopRequireDefault(require("./DimensionProjectOverviewCard"));

var _ProjectDetailsCard = _interopRequireDefault(require("./ProjectDetailsCard"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DimensionDetailsCard extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleTabChange", key => {
      console.log(key);
      this.setState({
        activeSubDimension: key,
        activeTab: key,
        boiDetails: []
      });
    });

    _defineProperty(this, "togglePopover", boi => {
      this.setState(state => ({
        popover: !state.popover,
        selectedBoi: boi ? boi : null
      }));
    });

    this.state = {
      popover: false,
      activeTab: null,
      activeSubDimension: null,
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
      boiDetails: [],
      selectedBoi: null
    };
  }

  componentDidMount() {
    if (Array.isArray(this.props.subDimension) && this.props.subDimension.length) {
      this.setState({
        activeSubDimension: this.props.subDimension[0],
        activeTab: this.props.subDimension[0]
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeSubDimension !== prevState.activeSubDimension) {
      this.loadDimensionDetails();
    }
  }

  loadDimensionDetails() {
    _axiosInstance.default.get("".concat(this.props.server, "/api/Svm/boi-details?clientId=").concat(this.state.clientId, "&languageCode=").concat(this.state.languageCode, "&fiscalYear=").concat(this.props.fiscalYear, "&programId=").concat(this.props.programId, "&dimension=").concat(this.props.dimensionName, "&subDimension=").concat(this.state.activeSubDimension)).then(res => {
      if (Array.isArray(res.data)) {
        this.setState({
          boiDetails: [...res.data]
        });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    const {
      dimensionName,
      subDimension,
      server,
      programId,
      fiscalYear
    } = this.props;
    const {
      popover,
      activeTab,
      boiDetails,
      selectedBoi,
      activeSubDimension
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: popover ? "dimension-collapse-card" : "dimension-collapse-card p-4"
    }, /*#__PURE__*/_react.default.createElement("h6", {
      className: popover ? "p-3 bodytext14-medium-midnight" : "bodytext14-medium-midnight"
    }, dimensionName, /*#__PURE__*/_react.default.createElement("img", {
      src: _upArrowIcon.default,
      className: "float-right mt-1 cursor",
      onClick: this.props.onClose
    })), !popover ? /*#__PURE__*/_react.default.createElement(_reactBootstrap.Tabs //   defaultActiveKey="DimensionProjectOverviewCard0"
    , {
      activeKey: activeTab,
      onSelect: this.handleTabChange,
      className: "project-detail-tabs"
    }, subDimension === null || subDimension === void 0 ? void 0 : subDimension.map((o, i) => /*#__PURE__*/_react.default.createElement(_reactBootstrap.Tab, {
      eventKey: o,
      title: o,
      key: "dimension-project-overviewcard-".concat(dimensionName, "-").concat(i)
    }, boiDetails.map((_o, _i) => /*#__PURE__*/_react.default.createElement(_DimensionProjectOverviewCard.default, _extends({}, _o, {
      index: _i + 1,
      key: "dimension-project-overviewcard-".concat(o.name, "-").concat(_i),
      openProjectView: () => this.togglePopover(_o.boi)
    })))))) : /*#__PURE__*/_react.default.createElement(_ProjectDetailsCard.default, {
      onClose: this.togglePopover,
      programId: programId,
      server: server,
      dimension: dimensionName,
      subDimension: activeSubDimension,
      fiscalYear: fiscalYear,
      boi: selectedBoi
    }));
  }

}

exports.DimensionDetailsCard = DimensionDetailsCard;
DimensionDetailsCard.defaultProps = {
  server: null,
  dimensionName: "",
  programId: null,
  fiscalYear: null,
  subDimension: [],
  onClose: () => {}
};
DimensionDetailsCard.propTypes = {
  server: _propTypes.default.string,
  dimensionName: _propTypes.default.string,
  programId: _propTypes.default.string,
  fiscalYear: _propTypes.default.string,
  subDimension: _propTypes.default.arrayOf(_propTypes.default.string),
  onClose: _propTypes.default.func
};
var _default = DimensionDetailsCard;
exports.default = _default;