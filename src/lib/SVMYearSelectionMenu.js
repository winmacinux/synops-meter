/* eslint-disable */
import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropDownToggle from "./images/dropDownToggle-icon.svg";
import PropTypes from "prop-types";
import axiosInstance from "./axiosInstance";

class SVMYearSelectionMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      years: [],
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
    };
  }

  componentDidMount() {
    this.loadFiscalYears();
    // if (this.props.selected)
    //   this.setState({
    //     selected: this.props.selected,
    //   });
  }

  loadFiscalYears = () => {
    if (this.state.clientId && this.state.languageCode)
      axiosInstance
        .get(
          `${this.props.server}/api/Svm/fiscal-year?clientId=${this.state.clientId}&languageCode=${this.state.languageCode}`
        )
        .then((res) => {
          if (res.data.length) {
            this.props.onChange(res.data[0]);
            this.setState({
              years: [...res.data],
              selected: res.data[0],
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
  };

  render() {
    const { selected, years } = this.state;

    return (
      <Dropdown className="custom-hover-dropdown mr-2">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selected} <img src={DropDownToggle} />
        </Dropdown.Toggle>

        <Dropdown.Menu align='right'>
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
};

SVMYearSelectionMenu.propTypes = {
  server: PropTypes.string,
  onChange: PropTypes.func,
};

export { SVMYearSelectionMenu };
