import React, { Component } from "react";
import PropTypes from "prop-types";
import "./css/SVM.css";

class DotLabels extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items } = this.props;

    return (
      <div className="status-list">
        <ul>
          {items?.map((o, i) => (
            <li key={`svm-dot-dimnesion-labels-${i}`}>
              <span
                className="dot dot-purple"
                style={{
                  background: o.color,
                }}
              ></span>
              <span className="bodytext14-medium-midnight">{o.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

DotLabels.defaultProps = {
  items: [
    {
      color: "rgb(117, 0, 192)",
      label: "Identified Value",
    },
    {
      color: "rgb(133, 215, 255)",
      label: "Delivered Value",
    },
  ],
};

DotLabels.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

export { DotLabels };
export default DotLabels;
