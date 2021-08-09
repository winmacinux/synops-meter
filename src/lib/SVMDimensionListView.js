import React, { Component } from "react";
import PropTypes from "prop-types";
import DownArrowIcon from "./images/downArrow-icon.svg";
import DotLabels from "./DotLabels";
import DimensionDetailsCard from "./DimensionDetailsCard";

class SVMDimensionListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExpandedDimension: false,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expand !== this.props.expand) {
      console.log(this.props.expand);
      this.setState({
        showExpandedDimension: this.props.expand,
      });
    }
  }

  toggleExpandedDimensionView = () => {
    this.setState((state) => ({
      showExpandedDimension: !state.showExpandedDimension,
    }));
    this.props.toggleView(!this.state.showExpandedDimension);
  };

  render() {
    const {
      dimensionName,
      dimension,
      programId,
      fiscalYear,
      server,
      isActive,
    } = this.props;
    const { showExpandedDimension } = this.state;

    return (
      <React.Fragment>
        {showExpandedDimension ? (
          <div className="details-view-section mb-3">
            {/* ----- Dimension Expanded View Start -----  */}
            <DotLabels />

            <DimensionDetailsCard
              server={server}
              fiscalYear={fiscalYear}
              programId={programId}
              {...dimension}
              onClose={this.toggleExpandedDimensionView}
            />
            {/* ----- Dimension Expanded View End -----  */}
          </div>
        ) : (
          <div className="list-card" onClick={this.toggleExpandedDimensionView}>
            <h6 className="bodytext14-medium-midnight">
              {dimensionName}{" "}
              {isActive && <img className="float-right" src={DownArrowIcon} />}
            </h6>
          </div>
        )}
      </React.Fragment>
    );
  }
}

SVMDimensionListView.defaultProps = {
  isActive: false,
  server: null,
  expand: null,
  programId: null,
  fiscalYear: null,
  dimensionName: "",
  dimension: null,
  text: "",
  toggleView: () => {},
};

SVMDimensionListView.propTypes = {
  isActive: PropTypes.bool,
  server: PropTypes.string,
  expand: PropTypes.bool,
  programId: PropTypes.string,
  fiscalYear: PropTypes.string,
  dimensionName: PropTypes.string,
  dimension: PropTypes.object,
  text: PropTypes.string,
  toggleView: PropTypes.func,
};

export { SVMDimensionListView };
