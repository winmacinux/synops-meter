"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVM = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _SVMDimensionCard = require("./SVMDimensionCard");

var _SVMOfferingFilterMenu = require("./SVMOfferingFilterMenu");

var _SVMYearSelectionMenu = require("./SVMYearSelectionMenu");

var _gridBlueIcon = _interopRequireDefault(require("./images/gridBlue-icon.svg"));

var _gridGreyIcon = _interopRequireDefault(require("./images/gridGrey-icon.svg"));

var _listBlueIcon = _interopRequireDefault(require("./images/listBlue-icon.svg"));

var _listGreyIcon = _interopRequireDefault(require("./images/listGrey-icon.svg"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

var _SVMDimensionListView = require("./SVMDimensionListView");

var _SVMDoughNutChartV = require("./SVMDoughNutChartV2");

var _DotLabels = _interopRequireDefault(require("./DotLabels"));

var _DimensionDetailsCard = require("./DimensionDetailsCard");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("bootstrap/dist/css/bootstrap.css");

require("./css/SVM.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_axiosInstance.default.defaults.headers.common["Authorization"] = "Bearer ".concat(sessionStorage.getItem("adal.idtoken"));
const DIMENSIONS = [{
  dimensionName: "Financial",
  text: "Financial metrics measure the Financial goals agreed mutually with our clients.",
  value: 100,
  fill: "#B455AA"
}, {
  dimensionName: "Experience",
  text: "The transforming experiences we provide for our clients’ employees and customers. Experience metrics focus on delivering a great experience for our partners and communities.",
  value: 100,
  fill: "#A055F5"
}, {
  dimensionName: "Sustainability",
  text: "How are we helping our clients achieve their sustainability. Setting and achieving bold goals around sustainability including net-zero emissions, moving to zero waste and plans for water risk achievement by 2025.",
  value: 100,
  fill: "#595959"
}, {
  dimensionName: "Talent",
  text: "Talent metrics measures our ability to upskill talent helping our clients transform the skills of their people",
  value: 100,
  fill: "#460073"
}, {
  dimensionName: "Inclusion & Diversity",
  text: "Inclusion & Diversity metrics include how we are bringing diverse teams to our clients to help them be more innovative. We will also measure our mutual goals with clients to make progress on inclusion and diversity.",
  value: 100,
  fill: "#7500C1"
}, {
  dimensionName: "Custom",
  text: "Customized metrics include innovation, agility or other specific capabilities that are important to our clients, because every client is different.",
  value: 100,
  fill: "#A100FF"
}];

class SVM extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "changeView", () => {
      this.setState(state => ({
        isGridView: !state.isGridView,
        selectedDimension: null,
        listDimensionExpanded: false,
        showExpandedDimension: false
      }));
    });

    _defineProperty(this, "showExpandedDimensionView", (i, status) => {
      this.setState({
        showExpandedDimension: status,
        selectedDimension: i
      });
    });

    _defineProperty(this, "showExpandedDimensionListView", (i, status) => {
      this.setState({
        listDimensionExpanded: status,
        selectedDimension: i
      });
    });

    _defineProperty(this, "onWheelDimensionClick", i => {
      if (this.state.isGridView) {
        if (this.state.showExpandedDimension) {
          this.setState({
            showExpandedDimension: false,
            selectedDimension: null
          });
        } else {
          this.setState({
            showExpandedDimension: this.state.dimensions[i] && this.state.dimensions[i].isActive,
            selectedDimension: i
          });
        }
      } else {
        if (this.state.listDimensionExpanded) {
          this.setState({
            listDimensionExpanded: false,
            selectedDimension: null
          });
        } else {
          this.setState({
            listDimensionExpanded: this.state.dimensions[i] && this.state.dimensions[i].isActive,
            selectedDimension: i
          });
        }
      }
    });

    _defineProperty(this, "hideExpandedDimensionView", () => {
      this.setState({
        showExpandedDimension: false,
        listDimensionExpanded: false,
        selectedDimension: null
      });
    });

    _defineProperty(this, "handleProgramChange", programId => {
      console.log(programId);
      if (programId) this.setState({
        programId
      });
    });

    _defineProperty(this, "handleFiscalYearChange", fiscalYear => {
      console.log(fiscalYear);
      if (fiscalYear) this.setState({
        fiscalYear
      });
    });

    _defineProperty(this, "loadDimensionDetails", () => {
      if (this.state.programId && this.state.fiscalYear) {
        _axiosInstance.default.get("".concat(this.props.server, "/api/Svm/dimension-details?clientId=").concat(this.state.clientId, "&languageCode=").concat(this.state.languageCode, "&fiscalYear=").concat(this.state.fiscalYear, "&programId=").concat(this.state.programId)).then(res => {
          if (Array.isArray(res.data)) {
            const updatedDimensions = DIMENSIONS.map(o => {
              let dimension = res.data.filter(_o => _o.dimensionName.toLowerCase() === o.dimensionName.toLowerCase());

              if (dimension.length) {
                dimension = dimension[0];
                return _objectSpread(_objectSpread(_objectSpread({}, o), dimension), {}, {
                  isActive: true
                });
              } else {
                return _objectSpread(_objectSpread({}, o), {}, {
                  isActive: false
                });
              }
            });
            this.setState({
              dimensions: updatedDimensions,
              selectedDimension: null,
              listDimensionExpanded: false,
              showExpandedDimension: false
            });
          }
        }).catch(err => {
          console.log(err);
        });
      }
    });

    this.state = {
      dimensions: DIMENSIONS,
      programId: null,
      fiscalYear: null,
      isGridView: true,
      accentureKeyFacts_ViewMoreScreen: [],
      showExpandedDimension: false,
      listDimensionExpanded: false,
      selectedDimension: null,
      accentureKeyFacts: null,
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode")
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.programId !== this.state.programId || prevState.fiscalYear !== this.state.fiscalYear) {
      this.loadDimensionDetails();
    }
  }

  render() {
    const {
      dimensions,
      isGridView,
      showExpandedDimension,
      selectedDimension,
      fiscalYear,
      programId,
      listDimensionExpanded
    } = this.state;
    const {
      server,
      shrink
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "row mt-5"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-lg-4"
    }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h3", {
      className: "synops-heading"
    }, "SynOps Value Meter"), /*#__PURE__*/_react.default.createElement("div", {
      style: {
        width: "100%",
        height: "500px"
      }
    }, /*#__PURE__*/_react.default.createElement(_SVMDoughNutChartV.SVMDoughNutChartV2, {
      expandSubMenu: this.onWheelDimensionClick,
      dimensions: dimensions,
      expand: showExpandedDimension || listDimensionExpanded,
      selectedDimension: selectedDimension,
      subDimensions: [...(dimensions[selectedDimension] && Array.isArray(dimensions[selectedDimension].subDimension) ? dimensions[selectedDimension].subDimension.map(o => ({
        name: o,
        value: 100,
        fill: dimensions[selectedDimension].fill
      })) : [])]
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-lg-8"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "dimension-section"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "dropdown-section"
    }, /*#__PURE__*/_react.default.createElement(_SVMOfferingFilterMenu.SVMOfferingFilterMenu, {
      server: server,
      onChange: this.handleProgramChange
    }), /*#__PURE__*/_react.default.createElement(_SVMYearSelectionMenu.SVMYearSelectionMenu, {
      server: server,
      onChange: this.handleFiscalYearChange
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "ml-2 border-left"
    }, isGridView ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1 ml-3",
      src: _gridBlueIcon.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1",
      src: _listGreyIcon.default,
      onClick: this.changeView
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1 ml-3",
      src: _gridGreyIcon.default,
      onClick: this.changeView
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1",
      src: _listBlueIcon.default
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "dimension"
    }, /*#__PURE__*/_react.default.createElement("h2", null, "Dimension"), showExpandedDimension && dimensions[selectedDimension] && dimensions[selectedDimension].isActive ? /*#__PURE__*/_react.default.createElement("div", {
      className: "details-view-section"
    }, /*#__PURE__*/_react.default.createElement(_DotLabels.default, null), /*#__PURE__*/_react.default.createElement(_DimensionDetailsCard.DimensionDetailsCard, _extends({
      server: server,
      fiscalYear: fiscalYear,
      programId: programId
    }, dimensions[selectedDimension], {
      onClose: this.hideExpandedDimensionView
    }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "row"
    }, isGridView ? dimensions === null || dimensions === void 0 ? void 0 : dimensions.map((o, i) => /*#__PURE__*/_react.default.createElement("div", {
      className: shrink ? "col-6 px-0" : "col-4 px-0",
      key: "svm-dimension-card-".concat(i)
    }, /*#__PURE__*/_react.default.createElement(_SVMDimensionCard.SVMDimensionCard, _extends({}, o, {
      toggleView: status => this.showExpandedDimensionView(i, status)
    })))) : /*#__PURE__*/_react.default.createElement("div", {
      className: "col px-0"
    }, dimensions === null || dimensions === void 0 ? void 0 : dimensions.map((o, i) => /*#__PURE__*/_react.default.createElement(_SVMDimensionListView.SVMDimensionListView, _extends({}, o, {
      server: server,
      fiscalYear: fiscalYear,
      programId: programId,
      dimension: o,
      expand: o.isActive && selectedDimension === i,
      toggleView: status => status ? this.showExpandedDimensionListView(i, status) : this.hideExpandedDimensionView(),
      key: "svm-dimension-list-view-".concat(i)
    }))))))))));
  }

}

exports.SVM = SVM;
SVM.defaultProps = {
  server: "http://localhost:50647",
  shrink: false
};
SVM.propTypes = {
  server: _propTypes.default.string,
  shrink: _propTypes.default.bool
};