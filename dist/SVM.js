"use strict";

require("core-js/modules/es.object.assign.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVM = void 0;

require("core-js/modules/es.array.reverse.js");

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
  fill: "#B455AA",
  isActive: false,
  opacity: 0.4
}, {
  dimensionName: "Experience",
  text: "The transforming experiences we provide for our clients’ employees and customers. Experience metrics focus on delivering a great experience for our partners and communities.",
  value: 100,
  fill: "#A055F5",
  isActive: false,
  opacity: 0.4
}, {
  dimensionName: "Sustainability",
  text: "How are we helping our clients achieve their sustainability. Setting and achieving bold goals around sustainability including net-zero emissions, moving to zero waste and plans for water risk achievement by 2025.",
  value: 100,
  fill: "#595959",
  isActive: false,
  opacity: 0.4
}, {
  dimensionName: "Talent",
  text: "Talent metrics measures our ability to upskill talent helping our clients transform the skills of their people",
  value: 100,
  fill: "#460073",
  isActive: false,
  opacity: 0.4
}, {
  dimensionName: "Inclusion &Diversity",
  text: "Inclusion & Diversity metrics include how we are bringing diverse teams to our clients to help them be more innovative. We will also measure our mutual goals with clients to make progress on inclusion and diversity.",
  value: 100,
  fill: "#7500C1",
  isActive: false,
  opacity: 0.4
}, {
  dimensionName: "Custom",
  text: "Customized metrics include innovation, agility or other specific capabilities that are important to our clients, because every client is different.",
  value: 100,
  fill: "#A100FF",
  isActive: false,
  opacity: 0.4
}];
const subDimensionsColors = ["#0087e8", "#ffb023", "#00d58b", "#96968c", "#00b9f2"];

class SVM extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "isSVMAvailable", () => {
      this.setState({
        isLoading: true
      });

      _axiosInstance.default.get("".concat(this.props.server, "Svm/is-svmavailable?clientId=").concat(this.props.clientId, "&languageCode=").concat(this.props.languageCode)).then(res => {
        this.props.handleSVMAvailablity(res.data);
        this.setState({
          isLoading: false
        });
      }).catch(err => {
        console.error(err);
        this.props.handleSVMAvailablity(false);
        this.setState({
          isLoading: false
        });
      });
    });

    _defineProperty(this, "changeView", () => {
      this.setState(state => ({
        isGridView: !state.isGridView,
        selectedDimension: null,
        selectedSubDimension: null,
        listDimensionExpanded: false,
        showExpandedDimension: false,
        dimensions: state.dimensions.map(o => _objectSpread(_objectSpread({}, o), {}, {
          opacity: o.isActive ? 1 : o.opacity
        }))
      }));
    });

    _defineProperty(this, "showExpandedDimensionView", (i, status) => {
      this.setState(state => ({
        showExpandedDimension: status,
        selectedDimension: i,
        selectedSubDimension: null,
        dimensions: state.dimensions.map((o, _i) => _objectSpread(_objectSpread({}, o), {}, {
          opacity: o.isActive ? i !== _i ? 0.4 : 1 : o.opacity
        }))
      }));
    });

    _defineProperty(this, "showExpandedDimensionListView", (i, status) => {
      this.setState(state => ({
        listDimensionExpanded: status,
        selectedDimension: i,
        selectedSubDimension: null,
        dimensions: state.dimensions.map((o, _i) => _objectSpread(_objectSpread({}, o), {}, {
          opacity: o.isActive ? i !== _i ? 0.4 : 1 : o.opacity
        }))
      }));
    });

    _defineProperty(this, "onWheelSwitchSubDimension", subDimensionIndex => {
      if (this.selectedDimension !== null && subDimensionIndex !== null && subDimensionIndex !== this.state.selectedSubDimension) {
        this.setState({
          selectedSubDimension: subDimensionIndex
        });
      }
    });

    _defineProperty(this, "onWheelDimensionClick", i => {
      if ([null, undefined].includes(i)) {
        this.setState(state => ({
          showExpandedDimension: false,
          listDimensionExpanded: false,
          selectedDimension: null,
          selectedSubDimension: null,
          dimensions: state.dimensions.map(o => _objectSpread(_objectSpread({}, o), {}, {
            opacity: o.isActive ? 1 : o.opacity
          }))
        }));
        return;
      } else if (this.state.selectedDimension !== i && (this.state.showExpandedDimension || this.state.listDimensionExpanded)) {
        return;
      }

      const expand = this.state.dimensions[i] && this.state.dimensions[i].isActive;

      if (this.state.isGridView) {
        if (this.state.showExpandedDimension) {
          this.setState(state => ({
            showExpandedDimension: false,
            dimensions: state.dimensions.map(o => _objectSpread(_objectSpread({}, o), {}, {
              opacity: o.isActive ? 1 : o.opacity
            })),
            selectedDimension: null,
            selectedSubDimension: null
          }));
        } else {
          this.setState(state => ({
            showExpandedDimension: expand,
            dimensions: state.dimensions.map((o, _i) => _objectSpread(_objectSpread({}, o), {}, {
              opacity: expand && o.isActive && i !== _i ? 0.4 : o.opacity
            })),
            selectedDimension: expand ? i : null,
            selectedSubDimension: null
          }));
        }
      } else {
        if (this.state.listDimensionExpanded) {
          this.setState(state => ({
            listDimensionExpanded: false,
            dimensions: state.dimensions.map(o => _objectSpread(_objectSpread({}, o), {}, {
              opacity: o.isActive ? 1 : o.opacity
            })),
            selectedDimension: null,
            selectedSubDimension: null
          }));
        } else {
          this.setState(state => ({
            listDimensionExpanded: expand,
            dimensions: state.dimensions.map((o, _i) => _objectSpread(_objectSpread({}, o), {}, {
              opacity: expand && o.isActive && i !== _i ? 0.4 : o.opacity
            })),
            selectedDimension: expand ? i : null,
            selectedSubDimension: null
          }));
        }
      }
    });

    _defineProperty(this, "hideExpandedDimensionView", () => {
      this.setState(state => ({
        showExpandedDimension: false,
        listDimensionExpanded: false,
        selectedDimension: null,
        selectedSubDimension: null,
        dimensions: state.dimensions.map(o => _objectSpread(_objectSpread({}, o), {}, {
          opacity: o.isActive ? 1 : o.opacity
        }))
      }));
    });

    _defineProperty(this, "handleProgramChange", programId => {
      if (programId) this.setState({
        programId
      });
    });

    _defineProperty(this, "handleFiscalYearChange", fiscalYear => {
      if (fiscalYear) this.setState({
        fiscalYear
      });
    });

    _defineProperty(this, "loadDimensionDetails", () => {
      if (this.props.server && this.state.programId && this.state.fiscalYear) {
        _axiosInstance.default.get("".concat(this.props.server, "Svm/dimension-details?clientId=").concat(this.props.clientId, "&languageCode=").concat(this.props.languageCode, "&fiscalYear=").concat(this.state.fiscalYear, "&programId=").concat(this.state.programId)).then(res => {
          if (Array.isArray(res.data)) {
            const updatedDimensions = DIMENSIONS.map(o => {
              let dimension = res.data.filter(_o => _o.dimensionName.toLowerCase() === o.dimensionName.toLowerCase());

              if (dimension.length) {
                dimension = dimension[0];
                return _objectSpread(_objectSpread(_objectSpread({}, o), dimension), {}, {
                  isActive: true,
                  cursor: "pointer",
                  opacity: 1
                });
              } else {
                return _objectSpread(_objectSpread({}, o), {}, {
                  isActive: false,
                  fill: "#e7e7e7",
                  opacity: 0.4
                });
              }
            });
            this.setState({
              dimensions: updatedDimensions,
              selectedDimension: null,
              selectedSubDimension: null,
              listDimensionExpanded: false,
              showExpandedDimension: false
            });
          }
        }).catch(err => {
          console.log(err);
        });
      }
    });

    _defineProperty(this, "loadProgramDetails", () => {
      _axiosInstance.default.get("".concat(this.props.server, "Svm/program-year?clientId=").concat(this.props.clientId, "&languageCode=").concat(this.props.languageCode, "&offeringId=").concat(this.state.programId)).then(res => {
        const {
          programId,
          programName,
          fiscalYear
        } = res.data;

        if (programId !== null && Array.isArray(fiscalYear) && fiscalYear.length) {
          this.setState({
            fixedProgramName: programName,
            programId,
            fiscalYears: fiscalYear,
            fiscalYear: fiscalYear[0]
          });
        } else {
          this.setState({
            fixedProgramName: programName,
            fiscalYears: []
          });
        }
      }).catch(err => {
        console.log(err);
      });
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
      selectedSubDimension: null,
      accentureKeyFacts: null,
      error: null,
      isLoading: false,
      fixedProgramName: null
    };
  }

  componentDidMount() {
    if (!this.props.server) {
      this.setState({
        error: "Missing Server API Configuration"
      });
      this.props.handleSVMAvailablity(false);
    } else {
      this.isSVMAvailable();
    }

    if (this.props.offeringId) {
      this.setState({
        programId: this.props.offeringId
      }, () => {
        this.loadProgramDetails();
      });
    } // if (this.props.fiscalYear) {
    //   this.setState({
    //     fiscalYear: this.props.fiscalYear,
    //   });
    // }

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.programId !== this.state.programId || prevState.fiscalYear !== this.state.fiscalYear) {
      this.loadDimensionDetails();
    }

    if (prevProps.offeringId !== this.props.offeringId) {
      this.setState({
        programId: this.props.offeringId
      }, () => {
        this.loadProgramDetails();
      });
    } // if (prevProps.fiscalYear !== this.props.fiscalYear) {
    //   this.setState({
    //     fiscalYear: this.props.fiscalYear,
    //   });
    // }

  }

  render() {
    const {
      dimensions,
      isGridView,
      showExpandedDimension,
      selectedDimension,
      fiscalYear,
      fiscalYears,
      programId,
      listDimensionExpanded,
      error,
      isLoading,
      fixedProgramName,
      selectedSubDimension
    } = this.state;
    const {
      server,
      shrink,
      clientId,
      languageCode,
      theme,
      readonly
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, error ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-lg-12"
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: "header20-semibold-midnight"
    }, "360\xB0 Value Meter")), /*#__PURE__*/_react.default.createElement("div", {
      className: "col-lg-12 d-flex justify-content-center align-items-center",
      style: {
        height: 300
      }
    }, /*#__PURE__*/_react.default.createElement("h6", {
      style: {
        color: "red"
      }
    }, "SVM Error: ", error))) : !isLoading && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "col-lg-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      "data-tut": "SVM_TP"
    }, /*#__PURE__*/_react.default.createElement("h3", {
      className: "header20-semibold-midnight"
    }, "360\xB0 Value Meter"), /*#__PURE__*/_react.default.createElement(_SVMDoughNutChartV.SVMDoughNutChartV2, {
      theme: theme,
      expandSubMenu: this.onWheelDimensionClick,
      switchSubDimension: this.onWheelSwitchSubDimension,
      dimensions: dimensions,
      expand: showExpandedDimension || listDimensionExpanded,
      selectedDimension: selectedDimension,
      subDimensions: [...(dimensions[selectedDimension] && Array.isArray(dimensions[selectedDimension].subDimension) ? dimensions[selectedDimension].subDimension.map((o, i) => ({
        name: o,
        value: 100,
        // fill: dimensions[selectedDimension].fill,
        fill: subDimensionsColors[i],
        index: i
      })) : [])].reverse()
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: shrink ? "col-lg-5 pl-0" : "col-lg-8 pl-0 pr-4"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "dimension-section"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "dropdown-section"
    }, /*#__PURE__*/_react.default.createElement(_SVMOfferingFilterMenu.SVMOfferingFilterMenu, {
      server: server,
      onChange: this.handleProgramChange,
      clientId: clientId,
      languageCode: languageCode,
      theme: theme,
      readonly: readonly,
      fixedProgramName: fixedProgramName
    }), /*#__PURE__*/_react.default.createElement(_SVMYearSelectionMenu.SVMYearSelectionMenu, {
      server: server,
      onChange: this.handleFiscalYearChange,
      clientId: clientId,
      languageCode: languageCode,
      theme: theme,
      readonly: readonly,
      years: fiscalYears,
      fixedFiscalYear: Array.isArray(fiscalYears) && fiscalYears.length ? fiscalYears[0] : null
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: "ml-2 border-left"
    }, isGridView ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1 ml-3 cursor",
      src: _gridBlueIcon.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1 cursor",
      src: _listGreyIcon.default,
      onClick: this.changeView
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1 ml-3 cursor",
      src: _gridGreyIcon.default,
      onClick: this.changeView
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "mr-2 mb-1 cursor",
      src: _listBlueIcon.default
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "dimension"
    }, /*#__PURE__*/_react.default.createElement("h2", null, "Dimension"), showExpandedDimension && dimensions[selectedDimension] && dimensions[selectedDimension].isActive ? /*#__PURE__*/_react.default.createElement("div", {
      className: "details-view-section mr-3"
    }, /*#__PURE__*/_react.default.createElement(_DotLabels.default, null), /*#__PURE__*/_react.default.createElement(_DimensionDetailsCard.DimensionDetailsCard, _extends({
      isGridView: isGridView,
      theme: theme,
      server: server,
      fiscalYear: fiscalYear,
      programId: programId
    }, dimensions[selectedDimension], {
      onClose: this.hideExpandedDimensionView,
      selectedSubDimension: selectedSubDimension,
      clientId: clientId,
      languageCode: languageCode
    }))) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: isGridView ? "row scroll-view" : shrink ? "row scroll-view" : "row scroll-view  mr-2"
    }, isGridView ? dimensions === null || dimensions === void 0 ? void 0 : dimensions.map((o, i) => /*#__PURE__*/_react.default.createElement("div", {
      className: shrink ? "col-6 pr-0" : "col-4 pr-0",
      key: "svm-dimension-card-".concat(i)
    }, /*#__PURE__*/_react.default.createElement(_SVMDimensionCard.SVMDimensionCard, _extends({}, o, {
      theme: theme,
      toggleView: status => this.showExpandedDimensionView(i, status)
    })))) : /*#__PURE__*/_react.default.createElement("div", {
      className: "col pr-0"
    }, selectedDimension !== null && /*#__PURE__*/_react.default.createElement("div", {
      className: "details-view-section"
    }, /*#__PURE__*/_react.default.createElement(_DotLabels.default, null)), dimensions === null || dimensions === void 0 ? void 0 : dimensions.map((o, i) => o.isActive && /*#__PURE__*/_react.default.createElement(_SVMDimensionListView.SVMDimensionListView, _extends({}, o, {
      theme: theme,
      server: server,
      fiscalYear: fiscalYear,
      programId: programId,
      dimension: o,
      expand: o.isActive && selectedDimension === i,
      clientId: clientId,
      languageCode: languageCode,
      selectedSubDimension: selectedSubDimension,
      toggleView: status => status ? this.showExpandedDimensionListView(i, status) : this.hideExpandedDimensionView(),
      key: "svm-dimension-list-view-".concat(i)
    })))))))))));
  }

}

exports.SVM = SVM;
SVM.defaultProps = {
  server: null,
  shrink: false,
  handleSVMAvailablity: () => {},
  offeringId: null,
  fiscalYear: null,
  clientId: null,
  languageCode: null,
  theme: null
};
SVM.propTypes = {
  server: _propTypes.default.string,
  shrink: _propTypes.default.bool,
  handleSVMAvailablity: _propTypes.default.func,
  offeringId: _propTypes.default.string,
  fiscalYear: _propTypes.default.string,
  readonly: _propTypes.default.bool,
  clientId: _propTypes.default.string,
  languageCode: _propTypes.default.string,
  theme: _propTypes.default.string
};