"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMOfferingFilterMenu = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

var _react = _interopRequireWildcard(require("react"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _bookmarkWhiteIcon = _interopRequireDefault(require("./images/bookmarkWhite-icon.svg"));

var _bookmarkBlueIcon = _interopRequireDefault(require("./images/bookmarkBlue-icon.svg"));

var _dropDownToggleIcon = _interopRequireDefault(require("./images/dropDownToggle-icon.svg"));

var _rightAccordianIcon = _interopRequireDefault(require("./images/rightAccordian-icon.svg"));

var _rightAccordianWhiteIcon = _interopRequireDefault(require("./images/rightAccordianWhite-icon.svg"));

var _downAccordianWhiteIcon = _interopRequireDefault(require("./images/downAccordianWhite-icon.svg"));

var _i18next = _interopRequireDefault(require("i18next"));

var _rightarrowBlue = _interopRequireDefault(require("./images/rightarrow-blue.svg"));

var _headerAngleDownIcon = _interopRequireDefault(require("./images/headerAngleDown-icon.svg"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

var _jquery = _interopRequireDefault(require("jquery"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SVMOfferingFilterMenu extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "wrapperRef", /*#__PURE__*/(0, _react.createRef)());

    _defineProperty(this, "loadOfferings", () => {
      if (this.props.clientId && this.props.languageCode) _axiosInstance.default.get("".concat(this.props.server, "Svm/program-list?clientId=").concat(this.props.clientId, "&languageCode=").concat(this.props.languageCode)).then(res => {
        if (res.data.length) {
          let selectedOffering = res.data.filter((o, i) => o.isFavorite);
          let selected = null;
          let bookmark = null;
          let selectedSubOffering = null;

          if (selectedOffering.length) {
            selectedOffering = selectedOffering[0];
            selected = selectedOffering.programName;
            bookmark = selectedOffering.programId;
            selectedSubOffering = selectedOffering.subOffering ? selectedOffering.subOffering : null;
            this.props.onChange(selectedOffering.programId);
          } else {
            selected = res.data[0] && res.data[0].programName;
            selectedSubOffering = res.data[0] && res.data[0].subOffering ? res.data[0].subOffering : null;
            this.props.onChange(res.data[0].programId);
          }

          this.setState({
            offerings: [...res.data],
            selected,
            bookmark,
            selectedSubOffering
          });
        } else {
          this.setState({
            selected: "No Programs"
          });
        }
      }).catch(err => {
        console.log(err);
      });
    });

    _defineProperty(this, "handleBookmark", (e, programId) => {
      e.stopPropagation();
      e.preventDefault();
      const bookmark = !(this.state.bookmark === programId);

      _axiosInstance.default.post("".concat(this.props.server, "Svm/favourite-program?clientId=").concat(this.props.clientId, "&programId=").concat(programId, "&languageCode=").concat(this.props.languageCode, "&isFavorite=").concat(bookmark)).then(res => {// Get the lastest data from the
      }).catch(err => {
        console.log(err);
      });

      this.setState({
        bookmark: bookmark ? programId : null
      });
    });

    _defineProperty(this, "handleAccordian", (e, programId, subOffering, index) => {
      if (subOffering) {
        e.preventDefault();
        e.stopPropagation();
        const isExpanded = this.state.collapse.includes(programId);
        (0, _jquery.default)(".collapse.collapseItem".concat(index)).collapse(isExpanded ? "hide" : "show");
        this.setState(old => ({
          collapse: isExpanded ? old.collapse.filter(o => o != programId) : [...old.collapse, programId]
        }));
      }
    });

    _defineProperty(this, "handleChange", value => {
      if (value && Array.isArray(this.state.offerings)) {
        const selectedOffering = this.state.offerings.filter((o, i) => o.programId === value);

        if (selectedOffering.length) {
          const selected = selectedOffering[0].programName;
          const selectedSubOffering = selectedOffering[0].subOffering ? selectedOffering[0].subOffering : null;
          this.setState({
            selected,
            selectedSubOffering
          });
          this.props.onChange(value);
        }
      }

      this.setState({
        subMenuOpen1: !this.state.subMenuOpen1
      });
    });

    _defineProperty(this, "onClicksubmenu1", () => this.setState({
      subMenuOpen1: !this.state.subMenuOpen1
    }));

    _defineProperty(this, "handleClickOutside", event => {
      if (this.wrapperRef.current && !this.wrapperRef.current.contains(event.target)) {
        this.setState({
          subMenuOpen1: false
        });
      }
    });

    this.state = {
      bookmark: null,
      collapse: [],
      selected: "Loading... ",
      offerings: [],
      selectedSubOffering: null
    };
  }

  componentDidMount() {
    if (this.props.readonly) {
      this.setState({
        selected: this.props.fixedProgramName ? this.props.fixedProgramName : "No Programs"
      });
    } else {
      this.loadOfferings();
    }

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.readonly && prevProps.fixedProgramName !== this.props.fixedProgramName) {
      this.setState({
        selected: this.props.fixedProgramName ? this.props.fixedProgramName : "No Programs"
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const {
      bookmark,
      selected,
      offerings,
      selectedSubOffering
    } = this.state;
    const {
      theme,
      readonly
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
      className: "custom-hover-dropdown mr-2"
    }, selectedSubOffering && /*#__PURE__*/_react.default.createElement(_reactTooltip.default, {
      place: "left",
      type: "dark",
      effect: "solid",
      id: "OfferingTooltip",
      className: "svm-offering-tooltip"
    }, /*#__PURE__*/_react.default.createElement("span", null, _i18next.default.t(selectedSubOffering))), " ", /*#__PURE__*/_react.default.createElement("div", {
      onClick: this.onClicksubmenu1
    }, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Toggle, {
      variant: "success",
      id: "dropdown-basic",
      className: readonly && "no-filter-disable",
      disabled: readonly,
      "data-tip": true,
      "data-for": "OfferingTooltip"
    }, selected, theme === "1" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", /*#__PURE__*/_react.default.createElement("img", {
      className: this.state.subMenuOpen1 ? "reverse arrow_icon" : "arrow_icon",
      src: _rightarrowBlue.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: this.state.subMenuOpen1 ? "reverse-icon white_icon" : "white_icon",
      src: _headerAngleDownIcon.default
    })) : /*#__PURE__*/_react.default.createElement("img", {
      className: this.state.subMenuOpen1 ? "reverse-icon" : "",
      src: _dropDownToggleIcon.default
    }))), /*#__PURE__*/_react.default.createElement(_Dropdown.default.Menu, {
      align: "right",
      className: "padding-dropdown",
      ref: this.wrapperRef
    }, offerings === null || offerings === void 0 ? void 0 : offerings.map((o, i) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: "svm-menu-dropdown-offerings-".concat(i)
    }, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
      onClick: () => this.handleChange(o.programId)
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "d-flex"
    }, o.subOffering ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "toggler",
      "data-toggle": "collapse",
      "data-target": "#collapseItem".concat(i),
      onClick: e => this.handleAccordian(e, o.programId, o.subOffering, i)
    }, this.state.collapse.includes(o.programId) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "right-black down",
      src: _rightAccordianIcon.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "right-white",
      src: _downAccordianWhiteIcon.default
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "right-black",
      onClick: e => this.handleAccordian(e, o.programId, o.subOffering, i),
      "data-toggle": "collapse",
      "data-target": "#collapseItem".concat(i),
      src: _rightAccordianIcon.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "right-white",
      onClick: e => this.handleAccordian(e, o.programId, o.subOffering, i),
      "data-toggle": "collapse",
      "data-target": "#collapseItem".concat(i),
      src: _rightAccordianWhiteIcon.default
    }))), /*#__PURE__*/_react.default.createElement("div", null, o.programName)) : /*#__PURE__*/_react.default.createElement("div", null, o.programName)), /*#__PURE__*/_react.default.createElement("a", {
      className: "px-2 bookmark",
      "data-tip": true,
      "data-for": "bookmark"
    }, bookmark === o.programId ? /*#__PURE__*/_react.default.createElement("img", {
      src: _bookmarkBlueIcon.default,
      onClick: e => this.handleBookmark(e, o.programId)
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: _bookmarkWhiteIcon.default,
      onClick: e => this.handleBookmark(e, o.programId)
    }))), o.subOffering && /*#__PURE__*/_react.default.createElement("div", {
      className: "collapse dropdown-collapse collapseItem".concat(i),
      id: "collapseItem".concat(i)
    }, o.subOffering))), /*#__PURE__*/_react.default.createElement(_reactTooltip.default, {
      place: "bottom",
      type: "dark",
      effect: "solid",
      id: "bookmark",
      className: "dropdown-custom-tooltip"
    }, /*#__PURE__*/_react.default.createElement("span", null, _i18next.default.t("Mark it as a default view")))));
  }

}

exports.SVMOfferingFilterMenu = SVMOfferingFilterMenu;
SVMOfferingFilterMenu.defaultProps = {
  server: null,
  selected: "",
  onChange: () => {},
  clientId: null,
  languageCode: null,
  theme: null,
  readonly: false,
  fixedProgramName: null
};
SVMOfferingFilterMenu.propTypes = {
  server: _propTypes.default.string,
  selected: _propTypes.default.string,
  onChange: _propTypes.default.func,
  clientId: _propTypes.default.string,
  languageCode: _propTypes.default.string,
  theme: _propTypes.default.string,
  readonly: _propTypes.default.bool,
  fixedProgramName: _propTypes.default.string
};