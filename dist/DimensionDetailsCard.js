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

var _headerAngleDownIcon = _interopRequireDefault(require("./images/headerAngleDown-icon.svg"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

var _DimensionProjectOverviewSkeleton = _interopRequireDefault(require("./skeletons/DimensionProjectOverviewSkeleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class DimensionDetailsCard extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleTabChange", key => {
      if (this.state.activeSubDimension !== key) this.setState({
        activeSubDimension: key,
        activeTab: key,
        boiDetails: [],
        selectedBoi: null,
        popover: false
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
      boiDetails: [],
      loading: false,
      selectedBoi: null,
      theme: sessionStorage.getItem("theme")
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
    console.log(this.props);

    if (this.state.activeSubDimension !== prevState.activeSubDimension) {
      this.loadDimensionDetails();
    }

    if (this.props.selectedSubDimension !== prevProps.selectedSubDimension) {
      const subDimension = this.props.subDimension[this.props.selectedSubDimension] ? this.props.subDimension[this.props.selectedSubDimension] : null;
      if (subDimension !== this.state.activeSubDimension) this.handleTabChange(subDimension);
    }
  }

  loadDimensionDetails() {
    this.setState({
      loading: true
    });

    _axiosInstance.default.post("".concat(this.props.server, "Svm/boi-details"), {
      clientId: this.props.clientId,
      languageCode: this.props.languageCode,
      fiscalYear: this.props.fiscalYear,
      programId: this.props.programId,
      dimension: this.props.dimensionName,
      subDimension: this.state.activeSubDimension
    }).then(res => {
      if (Array.isArray(res.data)) {
        this.setState({
          boiDetails: [...res.data],
          loading: false
        });
      }
    }).catch(err => {
      console.log(err);
      this.setState({
        loading: false
      });
    });
  }

  render() {
    const {
      dimensionName,
      subDimension,
      server,
      programId,
      fiscalYear,
      clientId,
      languageCode
    } = this.props;
    const {
      popover,
      activeTab,
      boiDetails,
      selectedBoi,
      activeSubDimension,
      loading
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: popover ? "dimension-collapse-card" : this.props.isGridView ? "dimension-collapse-card p-4 dimension-collapse-card-scroll" : "dimension-collapse-card p-4"
    }, /*#__PURE__*/_react.default.createElement("h6", {
      className: popover ? "p-3 bodytext14-medium-midnight" : "bodytext14-medium-midnight"
    }, dimensionName, this.state.theme === "1" ? /*#__PURE__*/_react.default.createElement("img", {
      className: "white_icon float-right mt-1 cursor",
      src: _headerAngleDownIcon.default,
      onClick: this.props.onClose
    }) : /*#__PURE__*/_react.default.createElement("img", {
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
    }, !loading ? boiDetails.map((_o, _i) => /*#__PURE__*/_react.default.createElement(_DimensionProjectOverviewCard.default, _extends({}, _o, {
      index: _i + 1,
      key: "dimension-project-overviewcard-".concat(o.name, "-").concat(_i),
      openProjectView: () => this.togglePopover(_o.boi),
      unit: _o.unit === "USD" ? "$" : _o.unit
    }))) : [...new Array(2)].map((o, i) => /*#__PURE__*/_react.default.createElement(_DimensionProjectOverviewSkeleton.default, {
      key: "dimension-project-overviewcard-".concat(i)
    }))))) : /*#__PURE__*/_react.default.createElement(_ProjectDetailsCard.default, {
      onClose: this.togglePopover,
      programId: programId,
      server: server,
      dimension: dimensionName,
      subDimension: activeSubDimension,
      fiscalYear: fiscalYear,
      boi: selectedBoi,
      clientId: clientId,
      languageCode: languageCode
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
  onClose: () => {},
  clientId: null,
  languageCode: null,
  selectedSubDimension: null,
  isGridView: false
};
DimensionDetailsCard.propTypes = {
  server: _propTypes.default.string,
  dimensionName: _propTypes.default.string,
  programId: _propTypes.default.string,
  fiscalYear: _propTypes.default.string,
  subDimension: _propTypes.default.arrayOf(_propTypes.default.string),
  onClose: _propTypes.default.func,
  clientId: _propTypes.default.string,
  languageCode: _propTypes.default.string,
  selectedSubDimension: _propTypes.default.number,
  isGridView: _propTypes.default.bool
};
var _default = DimensionDetailsCard;
exports.default = _default;