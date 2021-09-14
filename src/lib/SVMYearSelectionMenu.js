/* eslint-disable */
import React, { Component, createRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import CaretIcon from "./images/rightarrow-blue.svg";
import WhiteCaretIcon from "./images/headerAngleDown-icon.svg";
import DropDownToggle from "./images/dropDownToggle-icon.svg";
import PropTypes from "prop-types";
import axiosInstance from "./axiosInstance";

class SVMYearSelectionMenu extends Component {
  wrapperRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      selected: "Loading... ",
      years: [],
    };
  }

  componentDidMount() {
    if (this.props.readonly) {
      this.setState({
        selected: this.props.fixedFiscalYear
          ? this.props.fixedFiscalYear
          : "No Fiscal Years",
        years: this.props.years,
      });
    } else {
      this.loadFiscalYears();
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  }
  componentDidUpdate(prevProps) {
    if (
      this.props.readonly &&
      prevProps.fixedFiscalYear !== this.props.fixedFiscalYear
    ) {
      this.setState({
        selected: this.props.fixedFiscalYear
          ? this.props.fixedFiscalYear
          : "No Fiscal Years",
      });
    }
    if (this.props.readonly && prevProps.years !== this.props.years) {
      this.setState({
        years: this.props.years,
      });
    }
  }

  loadFiscalYears = () => {
    if (this.props.clientId && this.props.languageCode)
      axiosInstance
        .get(
          `${this.props.server}Svm/fiscal-year?clientId=${this.props.clientId}&languageCode=${this.props.languageCode}`
        )
        .then((res) => {
          if (res.data.length) {
            this.props.onChange(res.data[0]);
            this.setState({
              years: [...res.data],
              selected: res.data[0],
            });
          } else {
            this.setState({
              selected: "No Fiscal Years",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  handleChange = (value) => {
    if (value) {
      this.setState({
        selected: value,
      });

      this.props.onChange(value);
    }
    this.setState({ subMenuOpen1: !this.state.subMenuOpen1 });
  };

  onClicksubmenu1 = () =>
    this.setState({ subMenuOpen1: !this.state.subMenuOpen1 });

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({ subMenuOpen1: false });
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { selected, years } = this.state;
    const { theme, readonly } = this.props;

    return (
      <Dropdown className="custom-hover-dropdown mr-2">
        <div onClick={this.onClicksubmenu1}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={readonly && !years.length && "no-filter-disable"}
            disabled={readonly && !years.length}
          >
            {selected}{" "}
            {theme === "1" ? (
              <React.Fragment>
                {" "}
                <img className="arrow_icon" src={CaretIcon} />
                <img className="white_icon" src={WhiteCaretIcon} />
              </React.Fragment>
            ) : (
              <img
                className={this.state.subMenuOpen1 ? "reverse-icon" : ""}
                src={DropDownToggle}
              />
            )}
          </Dropdown.Toggle>
        </div>
        <Dropdown.Menu align="right" ref={this.wrapperRef}>
          {Array.isArray(years)
            ? years.map((o, i) => (
                <Dropdown.Item
                  key={`svm-year-selection-item-${i}`}
                  onClick={() => this.handleChange(o)}
                >
                  {o}
                </Dropdown.Item>
              ))
            : null}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SVMYearSelectionMenu.defaultProps = {
  server: null,
  onChange: () => {},
  clientId: null,
  languageCode: null,
  theme: null,
  readonly: false,
  fixedFiscalYear: null,
  years: [],
};

SVMYearSelectionMenu.propTypes = {
  server: PropTypes.string,
  onChange: PropTypes.func,
  clientId: PropTypes.string,
  languageCode: PropTypes.string,
  theme: PropTypes.string,
  readonly: PropTypes.bool,
  fixedFiscalYear: PropTypes.string,
  years: PropTypes.arrayOf(PropTypes.string),
};

export { SVMYearSelectionMenu };
