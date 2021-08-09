import React, { Component } from "react";
import DownArrowIcon from "./images/downArrow-icon.svg";
import PropTypes from "prop-types";

class SVMDimensionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { dimensionName, text, isActive } = this.props;

    return (
      <div className="dimension-card">
        <h6 className="bodytext14-medium-midnight">
          {dimensionName}{" "}
          {isActive && (
            <img
              className="float-right"
              src={DownArrowIcon}
              onClick={() => this.props.toggleView(true)}
            />
          )}
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
};

SVMDimensionCard.propTypes = {
  isActive: PropTypes.bool,
  toggleView: PropTypes.func,
  dimensionName: PropTypes.string,
  text: PropTypes.string,
};

export { SVMDimensionCard };
