"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMYearSelectionMenu = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _Dropdown = _interopRequireDefault(require("react-bootstrap/Dropdown"));

var _rightarrowBlue = _interopRequireDefault(require("./images/rightarrow-blue.svg"));

var _headerAngleDownIcon = _interopRequireDefault(require("./images/headerAngleDown-icon.svg"));

var _dropDownToggleIcon = _interopRequireDefault(require("./images/dropDownToggle-icon.svg"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _axiosInstance = _interopRequireDefault(require("./axiosInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class SVMYearSelectionMenu extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "wrapperRef", /*#__PURE__*/(0, _react.createRef)());

    _defineProperty(this, "loadFiscalYears", () => {
      if (this.props.clientId && this.props.languageCode) _axiosInstance.default.get("".concat(this.props.server, "Svm/fiscal-year?clientId=").concat(this.props.clientId, "&languageCode=").concat(this.props.languageCode)).then(res => {
        if (res.data.length) {
          this.props.onChange(res.data[0]);
          this.setState({
            years: [...res.data],
            selected: res.data[0]
          });
        } else {
          this.setState({
            selected: "No Fiscal Years"
          });
        }
      }).catch(err => {
        console.log(err);
      });
    });

    _defineProperty(this, "handleChange", value => {
      if (value) {
        this.setState({
          selected: value
        });
        this.props.onChange(value);
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
      selected: "Loading... ",
      years: []
    };
  }

  componentDidMount() {
    if (this.props.readonly) {
      this.setState({
        selected: this.props.fixedFiscalYear ? this.props.fixedFiscalYear : "No Fiscal Years",
        years: this.props.years
      });
    } else {
      this.loadFiscalYears();
    }

    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.readonly && prevProps.fixedFiscalYear !== this.props.fixedFiscalYear) {
      this.setState({
        selected: this.props.fixedFiscalYear ? this.props.fixedFiscalYear : "No Fiscal Years"
      });
    }

    if (this.props.readonly && prevProps.years !== this.props.years) {
      this.setState({
        years: this.props.years
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const {
      selected,
      years
    } = this.state;
    const {
      theme,
      readonly
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_Dropdown.default, {
      className: "custom-hover-dropdown mr-2"
    }, /*#__PURE__*/_react.default.createElement("div", {
      onClick: this.onClicksubmenu1
    }, /*#__PURE__*/_react.default.createElement(_Dropdown.default.Toggle, {
      variant: "success",
      id: "dropdown-basic",
      className: readonly && !years.length && "no-filter-disable",
      disabled: readonly && !years.length
    }, selected, " ", theme === "1" ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ", /*#__PURE__*/_react.default.createElement("img", {
      className: "arrow_icon",
      src: _rightarrowBlue.default
    }), /*#__PURE__*/_react.default.createElement("img", {
      className: "white_icon",
      src: _headerAngleDownIcon.default
    })) : /*#__PURE__*/_react.default.createElement("img", {
      className: this.state.subMenuOpen1 ? "reverse-icon" : "",
      src: _dropDownToggleIcon.default
    }))), /*#__PURE__*/_react.default.createElement(_Dropdown.default.Menu, {
      align: "right",
      ref: this.wrapperRef
    }, Array.isArray(years) ? years.map((o, i) => /*#__PURE__*/_react.default.createElement(_Dropdown.default.Item, {
      key: "svm-year-selection-item-".concat(i),
      onClick: () => this.handleChange(o)
    }, o)) : null));
  }

}

exports.SVMYearSelectionMenu = SVMYearSelectionMenu;
SVMYearSelectionMenu.defaultProps = {
  server: null,
  onChange: () => {},
  clientId: null,
  languageCode: null,
  theme: null,
  readonly: false,
  fixedFiscalYear: null,
  years: []
};
SVMYearSelectionMenu.propTypes = {
  server: _propTypes.default.string,
  onChange: _propTypes.default.func,
  clientId: _propTypes.default.string,
  languageCode: _propTypes.default.string,
  theme: _propTypes.default.string,
  readonly: _propTypes.default.bool,
  fixedFiscalYear: _propTypes.default.string,
  years: _propTypes.default.arrayOf(_propTypes.default.string)
};