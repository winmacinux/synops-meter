"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ProjectDetailsCard = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _SVMProjectVerticalChart = _interopRequireDefault(require("./SVMProjectVerticalChart"));

var _core = require("@material-ui/core");

var _closeGreyIcon = _interopRequireDefault(require("./images/closeGrey-icon.svg"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ProjectDetailsCard extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "loadProjectDetails", () => {
      _axiosInstance.default.get("".concat(this.props.server, "/api/Svm/project-details?clientId=").concat(this.state.clientId, "&languageCode=").concat(this.state.languageCode, "&fiscalYear=").concat(this.props.fiscalYear, "&programId=").concat(this.props.programId, "&dimension=").concat(this.props.dimension, "&subDimension=").concat(this.props.subDimension, "&boi=").concat(this.props.boi)).then(res => {
        if (Array.isArray(res.data) && res.data.length) {
          this.setState({
            projects: [...res.data] // projects: [
            //   ...res.data.map((o) => ({
            //     ...o,
            //     fill1: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            //     fill2: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            //   })),
            // ],
            // activeProject: res.data[0].project,

          });
        }
      }).catch(err => {
        console.log(err);
      });
    });

    _defineProperty(this, "handleTabChange", (e, key) => {
      this.setState({
        tabValue: key
      });
    });

    this.state = {
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
      projects: [],
      tabValue: 0
    };
  }

  componentDidMount() {
    this.loadProjectDetails();
  } // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.activeProject !== this.state.activeProject) {
  //     this.loadProjectDetails();
  //   }
  // }


  render() {
    const {
      projects,
      tabValue
    } = this.state;
    const {
      boi
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "project-details"
    }, /*#__PURE__*/_react.default.createElement("img", {
      className: "float-right cursor",
      src: _closeGreyIcon.default,
      onClick: this.props.onClose
    }), /*#__PURE__*/_react.default.createElement("h5", null, boi), /*#__PURE__*/_react.default.createElement("div", {
      position: "static",
      color: "default"
    }, /*#__PURE__*/_react.default.createElement(_core.Tabs, {
      className: "project-detail-tabs mb-3",
      value: tabValue,
      onChange: this.handleTabChange,
      indicatorColor: "primary",
      textColor: "primary",
      variant: "scrollable",
      scrollButtons: "auto" // activeKey={activeProject}
      // onSelect={this.handleTabChange}

    }, projects.map((o, i) => /*#__PURE__*/_react.default.createElement(_core.Tab, {
      eventKey: "project".concat(i),
      label: o.project,
      "aria-controls": "scrollable-auto-tabpanel-".concat(i),
      id: "scrollable-auto-tab-".concat(i),
      key: "project-dimension-".concat(o.project, "-").concat(i)
    })))), projects.map((o, i) => /*#__PURE__*/_react.default.createElement("div", {
      role: "tabpanel",
      hidden: tabValue !== i,
      id: "scrollable-auto-tabpanel-".concat(i),
      value: tabValue,
      "aria-labelledby": "scrollable-auto-tab-".concat(i),
      key: "project-dimension-tabpanel-".concat(o.project, "-").concat(i),
      index: i
    }, tabValue === i && /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, o.projectDescription), /*#__PURE__*/_react.default.createElement(_SVMProjectVerticalChart.default, {
      dataset: [o.projectTargetValue, o.projectDeliveredValue] // colors={[o.fill1, o.fill2]}

    })))));
  }

}

exports.ProjectDetailsCard = ProjectDetailsCard;
ProjectDetailsCard.defualtProps = {
  server: null,
  dimension: null,
  subDimension: null,
  programId: null,
  fiscalYear: null,
  boi: null,
  onClose: () => {}
};
ProjectDetailsCard.propTypes = {
  server: _propTypes.default.string,
  dimension: _propTypes.default.string,
  subDimension: _propTypes.default.string,
  programId: _propTypes.default.string,
  fiscalYear: _propTypes.default.string,
  boi: _propTypes.default.string,
  onClose: _propTypes.default.func
};
var _default = ProjectDetailsCard;
exports.default = _default;