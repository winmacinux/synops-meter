import React, { Component } from "react";
import PropTypes from "prop-types";
import InfoIcon from "./images/infoCirclePurple-icon.svg";
import InfoDarkIcon from "./images/infoCirclePurpleDark-icon.svg";
import SVMHorizontalBarChart from "./SVMHorizontalBarChart";

class DimensionProjectOverviewCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      theme: sessionStorage.getItem("theme"),

    };
  }

  toggleProjectView = () => {
    this.setState((state) => ({
      popover: !state.popover,
    }));
    this.props.openProjectView();
  };

  render() {
    const {
      boi,
      boiDescription,
      index,
      programDeliveredValue,
      programTargetValue,    
      unit,
    } = this.props;

    return (
      <React.Fragment>
        <div className="tab-content">
          <h3>
            {index}) {boi}
            <button
              id="Popover1"
              className="project-details-button"
              onClick={this.toggleProjectView}
            >
              {" "}
              {this.state.theme === "1" ? (
                <img className="pr-2" src={InfoDarkIcon} />
              ) : (
                <img className="pr-2" src={InfoIcon} />
              )}
              Project Details
            </button>
            {/* <button className="custom-btn">Custom View</button> */}
          </h3>
          <p>{boiDescription}</p>
          <SVMHorizontalBarChart          
            dataset={[programTargetValue, programDeliveredValue]}
            labels={[`$ ${programTargetValue}`, `$ ${programDeliveredValue}`]}
            unit={unit}
          />
        </div>
        <hr className="my-2" />
      </React.Fragment>
    );
  }
}

DimensionProjectOverviewCard.defaultProps = {
  boi: "",
  boiDescription: "",
  programTargetValue: 0,
  programDeliveredValue: 0,
  dataset: [],
  labels: [],
  index: 1,
  openProjectView: () => {},
  unit: "$",
};
DimensionProjectOverviewCard.propTypes = {
  boi: PropTypes.string,
  boiDescription: PropTypes.string,
  programTargetValue: PropTypes.number,
  programDeliveredValue: PropTypes.number,
  dataset: PropTypes.arrayOf(PropTypes.number),
  labels: PropTypes.arrayOf(PropTypes.string),
  index: PropTypes.number,
  openProjectView: PropTypes.func,
  unit: PropTypes.string,
};

export { DimensionProjectOverviewCard };
export default DimensionProjectOverviewCard;
