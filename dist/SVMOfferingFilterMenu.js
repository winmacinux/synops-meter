"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMOfferingFilterMenu = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SVMOfferingFilterMenu extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "loadOfferings", () => {
      if (this.state.clientId && this.state.languageCode) _axiosInstance.default.get("".concat(this.props.server, "/api/Svm/program-list?clientId=").concat(this.state.clientId, "&languageCode=").concat(this.state.languageCode)).then(res => {
        if (res.data.length) {
          let selectedOffering = res.data.filter((o, i) => o.isFavorite);
          let selected = null;
          let bookmark = null;

          if (selectedOffering.length) {
            selectedOffering = selectedOffering[0];
            selected = selectedOffering.programName;
            bookmark = selectedOffering.programId;
            this.props.onChange(selectedOffering.programId);
          } else {
            selected = res.data[0].programName;
            this.props.onChange(res.data[0].programId);
          }

          this.setState({
            offerings: [...res.data],
            selected,
            bookmark
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

      _axiosInstance.default.post("".concat(this.props.server, "/api/Svm/favourite-program?clientId=").concat(this.state.clientId, "&programId=").concat(programId, "&languageCode=").concat(this.state.languageCode, "&isFavorite=").concat(bookmark)).then(res => {// Get the lastest data from the
      }).catch(err => {
        console.log(err);
      });

      this.setState({
        bookmark: bookmark ? programId : null
      });
    });

    _defineProperty(this, "handleAccordian", (e, programId, subOffering) => {
      if (subOffering) {
        // e.stopPropagation();
        e.preventDefault();
        this.setState(old => ({
          collapse: old.collapse !== programId ? programId : null
        }));
      }
    });

    _defineProperty(this, "handleChange", value => {
      if (value && Array.isArray(this.state.offerings)) {
        const selectedOffering = this.state.offerings.filter((o, i) => o.programId === value);

        if (selectedOffering.length) {
          const selected = selectedOffering[0].programName;
          this.setState({
            selected
          });
          this.props.onChange(value);
        }
      }
    });

    this.state = {
      bookmark: null,
      collapse: null,
      selected: null,
      offerings: [],
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode")
    };
  }

  componentDidMount() {
    this.loadOfferings(); // Mapping Bookmark on Page Loading
    // if (this.props.bookmarkedOffering) {
    //   if (Array.isArray(this.props.offerings)) {
    //     const selectedOffering = this.props.offerings.filter(
    //       (o, i) => o.programId === this.props.bookmarkedOffering
    //     );
    //     if (selectedOffering.length) {
    //       const selected = selectedOffering[0].name;
    //       this.setState({
    //         selected,
    //         bookmark: this.props.bookmarkedOffering,
    //       });
    //     }
    //   }
    // } else {
    //   const selected = "Select Offering";
    //   this.setState({
    //     selected,
    //   });
    // }
  }

  render() {
    const {
      bookmark,
      selected,
      offerings
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
      className: "custom-hover-dropdown mr-2"
    }, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Toggle, {
      variant: "success",
      id: "dropdown-basic"
    }, selected, " ", /*#__PURE__*/_react.default.createElement("img", {
      src: _dropDownToggleIcon.default
    })), /*#__PURE__*/_react.default.createElement(_Dropdown.default.Menu, {
      align: "right"
    }, offerings === null || offerings === void 0 ? void 0 : offerings.map((o, i) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, {
      key: "svm-menu-dropdown-offerings-".concat(i)
    }, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
      onClick: () => this.handleChange(o.programId)
    }, o.subOffering ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("a", null, this.state.collapse === o.programId ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "right-black down",
      src: _rightAccordianIcon.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "right-white",
      src: _downAccordianWhiteIcon.default
    })) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("img", {
      className: "right-black",
      src: _rightAccordianIcon.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "right-white",
      src: _rightAccordianWhiteIcon.default
    }))), /*#__PURE__*/_react.default.createElement("div", {
      "data-toggle": "collapse",
      "data-target": "#collapseItem".concat(i),
      onClick: e => this.handleAccordian(e, o.programId, o.subOffering)
    }, o.programName)) : /*#__PURE__*/_react.default.createElement("div", null, o.programName), /*#__PURE__*/_react.default.createElement("a", {
      className: "pl-3 bookmark",
      "data-tip": true,
      "data-for": "bookmark"
    }, bookmark === o.programId ? /*#__PURE__*/_react.default.createElement("img", {
      src: _bookmarkBlueIcon.default,
      onClick: e => this.handleBookmark(e, o.programId)
    }) : /*#__PURE__*/_react.default.createElement("img", {
      src: _bookmarkWhiteIcon.default,
      onClick: e => this.handleBookmark(e, o.programId)
    }))), o.subOffering && /*#__PURE__*/_react.default.createElement("div", {
      class: "collapse dropdown-collapse",
      id: "collapseItem".concat(i)
    }, o.subOffering))), /*#__PURE__*/_react.default.createElement(_reactTooltip.default, {
      place: "left",
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
  onChange: () => {}
};
SVMOfferingFilterMenu.propTypes = {
  server: _propTypes.default.string,
  selected: _propTypes.default.string,
  onChange: _propTypes.default.func
};