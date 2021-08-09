import React, { Component } from "react";
import PropTypes from "prop-types";
import UpArrowIcon from "./images/upArrow-icon.svg";
import { Tab, Tabs } from "react-bootstrap";
import DimensionProjectOverviewCard from "./DimensionProjectOverviewCard";
import ProjectDetailsCard from "./ProjectDetailsCard";
import axiosInstance from "./axiosInstance";

class DimensionDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      activeTab: null,
      activeSubDimension: null,
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
      boiDetails: [],
      selectedBoi: null,
    };
  }

  componentDidMount() {
    if (
      Array.isArray(this.props.subDimension) &&
      this.props.subDimension.length
    ) {
      this.setState({
        activeSubDimension: this.props.subDimension[0],
        activeTab: this.props.subDimension[0],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeSubDimension !== prevState.activeSubDimension) {
      this.loadDimensionDetails();
    }
  }

  loadDimensionDetails() {
    axiosInstance
      .get(
        `${this.props.server}/api/Svm/boi-details?clientId=${this.state.clientId}&languageCode=${this.state.languageCode}&fiscalYear=${this.props.fiscalYear}&programId=${this.props.programId}&dimension=${this.props.dimensionName}&subDimension=${this.state.activeSubDimension}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({
            boiDetails: [...res.data],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleTabChange = (key) => {
    console.log(key);
    this.setState({
      activeSubDimension: key,
      activeTab: key,
      boiDetails: [],
    });
  };

  togglePopover = (boi) => {
    this.setState((state) => ({
      popover: !state.popover,
      selectedBoi: boi ? boi : null,
    }));
  };

  render() {
    const {
      dimensionName,
      subDimension,
      server,
      programId,
      fiscalYear,
    } = this.props;
    const {
      popover,
      activeTab,
      boiDetails,
      selectedBoi,
      activeSubDimension,
    } = this.state;

    return (
      <div
        className={
          popover ? "dimension-collapse-card" : "dimension-collapse-card p-4"
        }
      >
        <h6 className={popover ? "p-3 bodytext14-medium-midnight" : "bodytext14-medium-midnight"}>
          {dimensionName}
          <img
            src={UpArrowIcon}
            className="float-right mt-1 cursor"
            onClick={this.props.onClose}
          />
        </h6>

        {!popover ? (
          <Tabs
            //   defaultActiveKey="DimensionProjectOverviewCard0"
            activeKey={activeTab}
            onSelect={this.handleTabChange}
            className="project-detail-tabs"
          >
            {subDimension?.map((o, i) => (
              <Tab
                eventKey={o}
                title={o}
                key={`dimension-project-overviewcard-${dimensionName}-${i}`}
              >
                {boiDetails.map((_o, _i) => (
                  <DimensionProjectOverviewCard
                    {..._o}
                    index={_i + 1}
                    key={`dimension-project-overviewcard-${o.name}-${_i}`}
                    openProjectView={() => this.togglePopover(_o.boi)}
                  />
                ))}
              </Tab>
            ))}
          </Tabs>
        ) : (
          <ProjectDetailsCard
            onClose={this.togglePopover}
            programId={programId}
            server={server}
            dimension={dimensionName}
            subDimension={activeSubDimension}
            fiscalYear={fiscalYear}
            boi={selectedBoi}
          />
        )}
      </div>
    );
  }
}

DimensionDetailsCard.defaultProps = {
  server: null,
  dimensionName: "",
  programId: null,
  fiscalYear: null,
  subDimension: [],
  onClose: () => {},
};

DimensionDetailsCard.propTypes = {
  server: PropTypes.string,
  dimensionName: PropTypes.string,
  programId: PropTypes.string,
  fiscalYear: PropTypes.string,
  subDimension: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
};

export { DimensionDetailsCard };
export default DimensionDetailsCard;
