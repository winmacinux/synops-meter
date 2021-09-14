import React, { Component } from "react";
import PropTypes from "prop-types";
import UpArrowIcon from "./images/upArrow-icon.svg";
import { Tab, Tabs } from "react-bootstrap";
import DimensionProjectOverviewCard from "./DimensionProjectOverviewCard";
import ProjectDetailsCard from "./ProjectDetailsCard";
import WhiteCaretIcon from "./images/headerAngleDown-icon.svg";
import axiosInstance from "./axiosInstance";
import DimensionProjectOverviewSkeleton from "./skeletons/DimensionProjectOverviewSkeleton";

class DimensionDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popover: false,
      activeTab: null,
      activeSubDimension: null,
      boiDetails: [],
      loading: false,
      selectedBoi: null,
      theme: sessionStorage.getItem("theme"),
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
    console.log(this.props);
    if (this.state.activeSubDimension !== prevState.activeSubDimension) {
      this.loadDimensionDetails();
    }
    if (this.props.selectedSubDimension !== prevProps.selectedSubDimension) {
      const subDimension = this.props.subDimension[
        this.props.selectedSubDimension
      ]
        ? this.props.subDimension[this.props.selectedSubDimension]
        : null;

      if (subDimension !== this.state.activeSubDimension)
        this.handleTabChange(subDimension);
    }
  }

  loadDimensionDetails() {
    this.setState({
      loading: true,
    });
    axiosInstance
      .post(`${this.props.server}Svm/boi-details`, {
        clientId: this.props.clientId,
        languageCode: this.props.languageCode,
        fiscalYear: this.props.fiscalYear,
        programId: this.props.programId,
        dimension: this.props.dimensionName,
        subDimension: this.state.activeSubDimension,
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({
            boiDetails: [...res.data],
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
        });
      });
  }

  handleTabChange = (key) => {
    if (this.state.activeSubDimension !== key)
      this.setState({
        activeSubDimension: key,
        activeTab: key,
        boiDetails: [],
        selectedBoi: null,
        popover: false,
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
      clientId,
      languageCode, 
    } = this.props;
    const {
      popover,
      activeTab,
      boiDetails,
      selectedBoi,
      activeSubDimension,
      loading,
    } = this.state;

    return (
      <div
        className={
          popover
            ? "dimension-collapse-card"
            : this.props.isGridView
            ? "dimension-collapse-card p-4 dimension-collapse-card-scroll"
            : "dimension-collapse-card p-4"
        }
      >
        <h6
          className={
            popover
              ? "p-3 bodytext14-medium-midnight"
              : "bodytext14-medium-midnight"
          }
        >
          {dimensionName}
          {this.state.theme === "1" ? (
            <img
              className="white_icon float-right mt-1 cursor"
              src={WhiteCaretIcon}
              onClick={this.props.onClose}
            />
          ) : (
            <img
              src={UpArrowIcon}
              className="float-right mt-1 cursor"
              onClick={this.props.onClose}
            />
          )}
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
                {!loading
                  ? boiDetails.map((_o, _i) => (
                      <DimensionProjectOverviewCard
                        {..._o}
                        index={_i + 1}
                        key={`dimension-project-overviewcard-${o.name}-${_i}`}
                        openProjectView={() => this.togglePopover(_o.boi)}
                        unit={_o.unit === "USD" ? "$" : _o.unit}
                      />
                    ))
                  : [...new Array(2)].map((o, i) => (
                      <DimensionProjectOverviewSkeleton
                        key={`dimension-project-overviewcard-${i}`}
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
            clientId={clientId}
            languageCode={languageCode}
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
  clientId: null,
  languageCode: null,
  selectedSubDimension: null,
  isGridView: false,
};

DimensionDetailsCard.propTypes = {
  server: PropTypes.string,
  dimensionName: PropTypes.string,
  programId: PropTypes.string,
  fiscalYear: PropTypes.string,
  subDimension: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
  clientId: PropTypes.string,
  languageCode: PropTypes.string,
  selectedSubDimension: PropTypes.number,
  isGridView: PropTypes.bool,
};

export { DimensionDetailsCard };
export default DimensionDetailsCard;
