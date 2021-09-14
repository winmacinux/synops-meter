import React, { Component } from "react";
import DownArrowIcon from "./images/downArrow-icon.svg";
import PropTypes from "prop-types";
import WhiteCaretIcon from "./images/headerAngleDown-icon.svg";

class SVMDimensionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dimensionName, text, isActive, theme } = this.props;

    return (
      <div
        className={isActive ? "dimension-card cursor" : "dimension-card"}
        onClick={() => (isActive ? this.props.toggleView(true) : false)}
      >
        <h6 className="bodytext14-medium-midnight">
          {dimensionName}{" "}
          {isActive &&
            (theme === "1" ? (
              <img className="float-right cursor" src={WhiteCaretIcon} />
            ) : (
              <img className="float-right cursor" src={DownArrowIcon} />
            ))}
        </h6>
        <p>{text}</p>
      </div>
    );
  }
}

SVMDimensionCard.defaultProps = {
  isActive: false,
  toggleView: () => {},
  dimensionName: "",
  text: "",
  theme: null,
};

SVMDimensionCard.propTypes = {
  isActive: PropTypes.bool,
  toggleView: PropTypes.func,
  dimensionName: PropTypes.string,
  text: PropTypes.string,
  theme: PropTypes.string,
};

export { SVMDimensionCard };
