import React, { Component } from "react";
import { SVMDimensionCard } from "./SVMDimensionCard";
import { SVMOfferingFilterMenu } from "./SVMOfferingFilterMenu";
import { SVMYearSelectionMenu } from "./SVMYearSelectionMenu";
import GridIcon from "./images/gridBlue-icon.svg";
import GridGreyIcon from "./images/gridGrey-icon.svg";
import ListIcon from "./images/listBlue-icon.svg";
import ListGreyIcon from "./images/listGrey-icon.svg";
import axiosInstance from "./axiosInstance";
import { SVMDimensionListView } from "./SVMDimensionListView";
import { SVMDoughNutChartV2 } from "./SVMDoughNutChartV2";
import DotLabels from "./DotLabels";
import { DimensionDetailsCard } from "./DimensionDetailsCard";
import PropTypes from "prop-types";
import 'bootstrap/dist/css/bootstrap.css';
import "./css/SVM.css";

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("adal.idtoken")}`;

const DIMENSIONS = [
  {
    dimensionName: "Financial",
    text:
      "Financial metrics measure the Financial goals agreed mutually with our clients.",
    value: 100,
    fill: "#B455AA",
  },
  {
    dimensionName: "Experience",
    text:
      "The transforming experiences we provide for our clients’ employees and customers. Experience metrics focus on delivering a great experience for our partners and communities.",
    value: 100,
    fill: "#A055F5",
  },
  {
    dimensionName: "Sustainability",
    text:
      "How are we helping our clients achieve their sustainability. Setting and achieving bold goals around sustainability including net-zero emissions, moving to zero waste and plans for water risk achievement by 2025.",
    value: 100,
    fill: "#595959",
  },
  {
    dimensionName: "Talent",
    text:
      "Talent metrics measures our ability to upskill talent helping our clients transform the skills of their people",
    value: 100,
    fill: "#460073",
  },
  {
    dimensionName: "Inclusion & Diversity",
    text:
      "Inclusion & Diversity metrics include how we are bringing diverse teams to our clients to help them be more innovative. We will also measure our mutual goals with clients to make progress on inclusion and diversity.",
    value: 100,
    fill: "#7500C1",
  },
  {
    dimensionName: "Custom",
    text:
      "Customized metrics include innovation, agility or other specific capabilities that are important to our clients, because every client is different.",
    value: 100,
    fill: "#A100FF",
  },
];

class SVM extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dimensions: DIMENSIONS,
      programId: null,
      fiscalYear: null,
      isGridView: true,
      accentureKeyFacts_ViewMoreScreen: [],
      showExpandedDimension: false,
      listDimensionExpanded: false,
      selectedDimension: null,
      accentureKeyFacts: null,
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.programId !== this.state.programId ||
      prevState.fiscalYear !== this.state.fiscalYear
    ) {
      this.loadDimensionDetails();
    }
  }

  changeView = () => {
    this.setState((state) => ({
      isGridView: !state.isGridView,
      selectedDimension: null,
      listDimensionExpanded: false,
      showExpandedDimension: false,
    }));
  };

  showExpandedDimensionView = (i, status) => {
    this.setState({
      showExpandedDimension: status,
      selectedDimension: i,
    });
  };

  showExpandedDimensionListView = (i, status) => {
    this.setState({
      listDimensionExpanded: status,
      selectedDimension: i,
    });
  };

  onWheelDimensionClick = (i) => {
    if (this.state.isGridView) {
      if (this.state.showExpandedDimension) {
        this.setState({
          showExpandedDimension: false,
          selectedDimension: null,
        });
      } else {
        this.setState({
          showExpandedDimension:
            this.state.dimensions[i] && this.state.dimensions[i].isActive,
          selectedDimension: i,
        });
      }
    } else {
      if (this.state.listDimensionExpanded) {
        this.setState({
          listDimensionExpanded: false,
          selectedDimension: null,
        });
      } else {
        this.setState({
          listDimensionExpanded:
            this.state.dimensions[i] && this.state.dimensions[i].isActive,
          selectedDimension: i,
        });
      }
    }
  };

  hideExpandedDimensionView = () => {
    this.setState({
      showExpandedDimension: false,
      listDimensionExpanded: false,
      selectedDimension: null,
    });
  };

  handleProgramChange = (programId) => {
    console.log(programId);
    if (programId) this.setState({ programId });
  };

  handleFiscalYearChange = (fiscalYear) => {
    console.log(fiscalYear);
    if (fiscalYear) this.setState({ fiscalYear });
  };

  loadDimensionDetails = () => {
    if (this.state.programId && this.state.fiscalYear) {
      axiosInstance
        .get(
          `${this.props.server}/api/Svm/dimension-details?clientId=${this.state.clientId}&languageCode=${this.state.languageCode}&fiscalYear=${this.state.fiscalYear}&programId=${this.state.programId}`
        )
        .then((res) => {
          if (Array.isArray(res.data)) {
            const updatedDimensions = DIMENSIONS.map((o) => {
              let dimension = res.data.filter(
                (_o) =>
                  _o.dimensionName.toLowerCase() ===
                  o.dimensionName.toLowerCase()
              );

              if (dimension.length) {
                dimension = dimension[0];
                return {
                  ...o,
                  ...dimension,
                  isActive: true,
                };
              } else {
                return {
                  ...o,
                  isActive: false,
                };
              }
            });

            this.setState({
              dimensions: updatedDimensions,
              selectedDimension: null,
              listDimensionExpanded: false,
              showExpandedDimension: false,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const {
      dimensions,
      isGridView,
      showExpandedDimension,
      selectedDimension,
      fiscalYear,
      programId,
      listDimensionExpanded,
    } = this.state;

    const { server, shrink } = this.props;

    return (
      <div className="row mt-5">
        <div className="col-lg-4">
          <div>
            <h3 className="synops-heading">SynOps Value Meter</h3>
            <div
              style={{
                width: "100%",
                height: "500px",
              }}
            >
              <SVMDoughNutChartV2
                expandSubMenu={this.onWheelDimensionClick}
                dimensions={dimensions}
                expand={showExpandedDimension || listDimensionExpanded}
                selectedDimension={selectedDimension}
                subDimensions={[
                  ...(dimensions[selectedDimension] &&
                  Array.isArray(dimensions[selectedDimension].subDimension)
                    ? dimensions[selectedDimension].subDimension.map((o) => ({
                        name: o,
                        value: 100,
                        fill: dimensions[selectedDimension].fill,
                      }))
                    : []),
                ]}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-8">
          {/* User Filters */}
          <div className="dimension-section">
            <div className="dropdown-section">
              <SVMOfferingFilterMenu
                server={server}
                onChange={this.handleProgramChange}
              />
              <SVMYearSelectionMenu
                server={server}
                onChange={this.handleFiscalYearChange}
              />
              <span className="ml-2 border-left">
                {isGridView ? (
                  <React.Fragment>
                    <img className="mr-2 mb-1 ml-3" src={GridIcon} />
                    <img
                      className="mr-2 mb-1"
                      src={ListGreyIcon}
                      onClick={this.changeView}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <img
                      className="mr-2 mb-1 ml-3"
                      src={GridGreyIcon}
                      onClick={this.changeView}
                    />
                    <img className="mr-2 mb-1" src={ListIcon} />
                  </React.Fragment>
                )}
              </span>
            </div>
            {/* Dimension */}
            <div className="dimension">
              <h2>Dimension</h2>

              {showExpandedDimension &&
              dimensions[selectedDimension] &&
              dimensions[selectedDimension].isActive ? (
                <div className="details-view-section">
                  {/* ----- Dimension Expanded View Start -----  */}
                  <DotLabels />
                  <DimensionDetailsCard
                    server={server}
                    fiscalYear={fiscalYear}
                    programId={programId}
                    {...dimensions[selectedDimension]}
                    onClose={this.hideExpandedDimensionView}
                  />
                  {/* ----- Dimension Expanded View End -----  */}
                </div>
              ) : (
                <React.Fragment>
                  {/* ----- Dimension Card View Start -----  */}
                  <div className="row">
                    {isGridView ? (
                      dimensions?.map((o, i) => (
                        <div
                          className={shrink ? "col-6 px-0" : "col-4 px-0"}
                          key={`svm-dimension-card-${i}`}
                        >
                          <SVMDimensionCard
                            {...o}
                            toggleView={(status) =>
                              this.showExpandedDimensionView(i, status)
                            }
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col px-0">
                        {dimensions?.map((o, i) => (
                          <SVMDimensionListView
                            {...o}
                            server={server}
                            fiscalYear={fiscalYear}
                            programId={programId}
                            dimension={o}
                            expand={o.isActive && selectedDimension === i}
                            toggleView={(status) =>
                              status
                                ? this.showExpandedDimensionListView(i, status)
                                : this.hideExpandedDimensionView()
                            }
                            key={`svm-dimension-list-view-${i}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  {/* ----- Dimension Card View End -----  */}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SVM.defaultProps = {
  server: "http://localhost:50647",
  shrink: false,
};
SVM.propTypes = {
  server: PropTypes.string,
  shrink: PropTypes.bool,
};

export { SVM };
