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
import "bootstrap/dist/css/bootstrap.css";
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
    isActive: false,
    opacity: 0.4,
  },
  {
    dimensionName: "Experience",
    text:
      "The transforming experiences we provide for our clients’ employees and customers. Experience metrics focus on delivering a great experience for our partners and communities.",
    value: 100,
    fill: "#A055F5",
    isActive: false,
    opacity: 0.4,
  },
  {
    dimensionName: "Sustainability",
    text:
      "How are we helping our clients achieve their sustainability. Setting and achieving bold goals around sustainability including net-zero emissions, moving to zero waste and plans for water risk achievement by 2025.",
    value: 100,
    fill: "#595959",
    isActive: false,
    opacity: 0.4,
  },
  {
    dimensionName: "Talent",
    text:
      "Talent metrics measures our ability to upskill talent helping our clients transform the skills of their people",
    value: 100,
    fill: "#460073",
    isActive: false,
    opacity: 0.4,
  },
  {
    dimensionName: "Inclusion &Diversity",
    text:
      "Inclusion & Diversity metrics include how we are bringing diverse teams to our clients to help them be more innovative. We will also measure our mutual goals with clients to make progress on inclusion and diversity.",
    value: 100,
    fill: "#7500C1",
    isActive: false,
    opacity: 0.4,
  },
  {
    dimensionName: "Custom",
    text:
      "Customized metrics include innovation, agility or other specific capabilities that are important to our clients, because every client is different.",
    value: 100,
    fill: "#A100FF",
    isActive: false,
    opacity: 0.4,
  },
];

const subDimensionsColors = [
  "#0087e8",
  "#ffb023",
  "#00d58b",
  "#96968c",
  "#00b9f2",
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
      selectedSubDimension: null,
      accentureKeyFacts: null,
      error: null,
      isLoading: false,
      fixedProgramName: null,
    };
  }

  componentDidMount() {
    if (!this.props.server) {
      this.setState({
        error: "Missing Server API Configuration",
      });
      this.props.handleSVMAvailablity(false);
    } else {
      this.isSVMAvailable();
    }

    if (this.props.offeringId) {
      this.setState(
        {
          programId: this.props.offeringId,
        },
        () => {
          this.loadProgramDetails();
        }
      );
    }
    // if (this.props.fiscalYear) {
    //   this.setState({
    //     fiscalYear: this.props.fiscalYear,
    //   });
    // }
  }

  isSVMAvailable = () => {
    this.setState({
      isLoading: true,
    });
    axiosInstance
      .get(
        `${this.props.server}Svm/is-svmavailable?clientId=${this.props.clientId}&languageCode=${this.props.languageCode}`
      )
      .then((res) => {
        this.props.handleSVMAvailablity(res.data);
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => {
        console.error(err);
        this.props.handleSVMAvailablity(false);
        this.setState({
          isLoading: false,
        });
      });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.programId !== this.state.programId ||
      prevState.fiscalYear !== this.state.fiscalYear
    ) {
      this.loadDimensionDetails();
    }
    if (prevProps.offeringId !== this.props.offeringId) {
      this.setState(
        {
          programId: this.props.offeringId,
        },
        () => {
          this.loadProgramDetails();
        }
      );
    }
    // if (prevProps.fiscalYear !== this.props.fiscalYear) {
    //   this.setState({
    //     fiscalYear: this.props.fiscalYear,
    //   });
    // }
  }

  changeView = () => {
    this.setState((state) => ({
      isGridView: !state.isGridView,
      selectedDimension: null,
      selectedSubDimension: null,
      listDimensionExpanded: false,
      showExpandedDimension: false,
      dimensions: state.dimensions.map((o) => ({
        ...o,
        opacity: o.isActive ? 1 : o.opacity,
      })),
    }));
  };

  showExpandedDimensionView = (i, status) => {
    this.setState((state) => ({
      showExpandedDimension: status,
      selectedDimension: i,
      selectedSubDimension: null,
      dimensions: state.dimensions.map((o, _i) => ({
        ...o,
        opacity: o.isActive ? (i !== _i ? 0.4 : 1) : o.opacity,
      })),
    }));
  };

  showExpandedDimensionListView = (i, status) => {
    this.setState((state) => ({
      listDimensionExpanded: status,
      selectedDimension: i,
      selectedSubDimension: null,
      dimensions: state.dimensions.map((o, _i) => ({
        ...o,
        opacity: o.isActive ? (i !== _i ? 0.4 : 1) : o.opacity,
      })),
    }));
  };

  onWheelSwitchSubDimension = (subDimensionIndex) => {
    if (
      this.selectedDimension !== null &&
      subDimensionIndex !== null &&
      subDimensionIndex !== this.state.selectedSubDimension
    ) {
      this.setState({
        selectedSubDimension: subDimensionIndex,
      });
    }
  };

  onWheelDimensionClick = (i) => {
    if ([null, undefined].includes(i)) {
      this.setState((state) => ({
        showExpandedDimension: false,
        listDimensionExpanded: false,
        selectedDimension: null,
        selectedSubDimension: null,
        dimensions: state.dimensions.map((o) => ({
          ...o,
          opacity: o.isActive ? 1 : o.opacity,
        })),
      }));
      return;
    } else if (
      this.state.selectedDimension !== i &&
      (this.state.showExpandedDimension || this.state.listDimensionExpanded)
    ) {
      return;
    }

    const expand =
      this.state.dimensions[i] && this.state.dimensions[i].isActive;
    if (this.state.isGridView) {
      if (this.state.showExpandedDimension) {
        this.setState((state) => ({
          showExpandedDimension: false,
          dimensions: state.dimensions.map((o) => ({
            ...o,
            opacity: o.isActive ? 1 : o.opacity,
          })),
          selectedDimension: null,
          selectedSubDimension: null,
        }));
      } else {
        this.setState((state) => ({
          showExpandedDimension: expand,
          dimensions: state.dimensions.map((o, _i) => ({
            ...o,
            opacity: expand && o.isActive && i !== _i ? 0.4 : o.opacity,
          })),
          selectedDimension: expand ? i : null,
          selectedSubDimension: null,
        }));
      }
    } else {
      if (this.state.listDimensionExpanded) {
        this.setState((state) => ({
          listDimensionExpanded: false,
          dimensions: state.dimensions.map((o) => ({
            ...o,
            opacity: o.isActive ? 1 : o.opacity,
          })),
          selectedDimension: null,
          selectedSubDimension: null,
        }));
      } else {
        this.setState((state) => ({
          listDimensionExpanded: expand,
          dimensions: state.dimensions.map((o, _i) => ({
            ...o,
            opacity: expand && o.isActive && i !== _i ? 0.4 : o.opacity,
          })),
          selectedDimension: expand ? i : null,
          selectedSubDimension: null,
        }));
      }
    }
  };

  hideExpandedDimensionView = () => {
    this.setState((state) => ({
      showExpandedDimension: false,
      listDimensionExpanded: false,
      selectedDimension: null,
      selectedSubDimension: null,
      dimensions: state.dimensions.map((o) => ({
        ...o,
        opacity: o.isActive ? 1 : o.opacity,
      })),
    }));
  };

  handleProgramChange = (programId) => {
    if (programId) this.setState({ programId });
  };

  handleFiscalYearChange = (fiscalYear) => {
    if (fiscalYear) this.setState({ fiscalYear });
  };

  loadDimensionDetails = () => {
    if (this.props.server && this.state.programId && this.state.fiscalYear) {
      axiosInstance
        .get(
          `${this.props.server}Svm/dimension-details?clientId=${this.props.clientId}&languageCode=${this.props.languageCode}&fiscalYear=${this.state.fiscalYear}&programId=${this.state.programId}`
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
                  cursor: "pointer",
                  opacity: 1,
                };
              } else {
                return {
                  ...o,
                  isActive: false,
                  fill: "#e7e7e7",
                  opacity: 0.4,
                };
              }
            });

            this.setState({
              dimensions: updatedDimensions,
              selectedDimension: null,
              selectedSubDimension: null,
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

  loadProgramDetails = () => {
    axiosInstance
      .get(
        `${this.props.server}Svm/program-year?clientId=${this.props.clientId}&languageCode=${this.props.languageCode}&offeringId=${this.state.programId}`
      )
      .then((res) => {
        const { programId, programName, fiscalYear } = res.data;

        if (
          programId !== null &&
          Array.isArray(fiscalYear) &&
          fiscalYear.length
        ) {
          this.setState({
            fixedProgramName: programName,
            programId,
            fiscalYears: fiscalYear,
            fiscalYear: fiscalYear[0],
          });
        } else {
          this.setState({
            fixedProgramName: programName,
            fiscalYears: [],
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const {
      dimensions,
      isGridView,
      showExpandedDimension,
      selectedDimension,
      fiscalYear,
      fiscalYears,
      programId,
      listDimensionExpanded,
      error,
      isLoading,
      fixedProgramName,
      selectedSubDimension,
    } = this.state;

    const {
      server,
      shrink,
      clientId,
      languageCode,
      theme,
      readonly,
    } = this.props;

    return (
      <React.Fragment>
        {error ? (
          <>
            <div className="col-lg-12">
              <h3 className="header20-semibold-midnight">360° Value Meter</h3>
            </div>
            <div
              className="col-lg-12 d-flex justify-content-center align-items-center"
              style={{
                height: 300,
              }}
            >
              <h6
                style={{
                  color: "red",
                }}
              >
                SVM Error: {error}
              </h6>
            </div>
          </>
        ) : (
          !isLoading && (
            <>
              <div className="col-lg-4">
                <div data-tut="SVM_TP">
                  <h3 className="header20-semibold-midnight">
                    360° Value Meter
                  </h3>

                  <SVMDoughNutChartV2
                    theme={theme}
                    expandSubMenu={this.onWheelDimensionClick}
                    switchSubDimension={this.onWheelSwitchSubDimension}
                    dimensions={dimensions}
                    expand={showExpandedDimension || listDimensionExpanded}
                    selectedDimension={selectedDimension}
                    subDimensions={[
                      ...(dimensions[selectedDimension] &&
                      Array.isArray(dimensions[selectedDimension].subDimension)
                        ? dimensions[selectedDimension].subDimension.map(
                            (o, i) => ({
                              name: o,
                              value: 100,
                              // fill: dimensions[selectedDimension].fill,
                              fill: subDimensionsColors[i],
                              index: i,
                            })
                          )
                        : []),
                    ].reverse()}
                  />
                </div>
              </div>
              <div className={shrink ? "col-lg-5 pl-0" : "col-lg-8 pl-0 pr-4"}>
                {/* User Filters */}
                <div className="dimension-section">
                  <div className="dropdown-section">
                    <SVMOfferingFilterMenu
                      server={server}
                      onChange={this.handleProgramChange}
                      clientId={clientId}
                      languageCode={languageCode}
                      theme={theme}
                      readonly={readonly}
                      fixedProgramName={fixedProgramName}
                    />
                    <SVMYearSelectionMenu
                      server={server}
                      onChange={this.handleFiscalYearChange}
                      clientId={clientId}
                      languageCode={languageCode}
                      theme={theme}
                      readonly={readonly}
                      years={fiscalYears}
                      fixedFiscalYear={
                        Array.isArray(fiscalYears) && fiscalYears.length
                          ? fiscalYears[0]
                          : null
                      }
                    />
                    <span className="ml-2 border-left">
                      {isGridView ? (
                        <React.Fragment>
                          <img
                            className="mr-2 mb-1 ml-3 cursor"
                            src={GridIcon}
                          />
                          <img
                            className="mr-2 mb-1 cursor"
                            src={ListGreyIcon}
                            onClick={this.changeView}
                          />
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <img
                            className="mr-2 mb-1 ml-3 cursor"
                            src={GridGreyIcon}
                            onClick={this.changeView}
                          />
                          <img className="mr-2 mb-1 cursor" src={ListIcon} />
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
                      <div className="details-view-section mr-3">
                        {/* ----- Dimension Expanded View Start -----  */}
                        <DotLabels />
                        <DimensionDetailsCard
                          isGridView={isGridView}
                          theme={theme}
                          server={server}
                          fiscalYear={fiscalYear}
                          programId={programId}
                          {...dimensions[selectedDimension]}
                          onClose={this.hideExpandedDimensionView}
                          selectedSubDimension={selectedSubDimension}
                          clientId={clientId}
                          languageCode={languageCode}
                        />
                        {/* ----- Dimension Expanded View End -----  */}
                      </div>
                    ) : (
                      <React.Fragment>
                        {/* ----- Dimension Card View Start -----  */}
                        <div
                          className={
                            isGridView
                              ? "row scroll-view"
                              : shrink
                              ? "row scroll-view"
                              : "row scroll-view  mr-2"
                          }
                        >
                          {isGridView ? (
                            dimensions?.map((o, i) => (
                              <div
                                className={shrink ? "col-6 pr-0" : "col-4 pr-0"}
                                key={`svm-dimension-card-${i}`}
                              >
                                <SVMDimensionCard
                                  {...o}
                                  theme={theme}
                                  toggleView={(status) =>
                                    this.showExpandedDimensionView(i, status)
                                  }
                                />
                              </div>
                            ))
                          ) : (
                            <div className="col pr-0">
                              {selectedDimension !== null && (
                                <div className="details-view-section">
                                  <DotLabels />
                                </div>
                              )}

                              {dimensions?.map(
                                (o, i) =>
                                  o.isActive && (
                                    <SVMDimensionListView
                                      {...o}
                                      theme={theme}
                                      server={server}
                                      fiscalYear={fiscalYear}
                                      programId={programId}
                                      dimension={o}
                                      expand={
                                        o.isActive && selectedDimension === i
                                      }
                                      clientId={clientId}
                                      languageCode={languageCode}
                                      selectedSubDimension={
                                        selectedSubDimension
                                      }
                                      toggleView={(status) =>
                                        status
                                          ? this.showExpandedDimensionListView(
                                              i,
                                              status
                                            )
                                          : this.hideExpandedDimensionView()
                                      }
                                      key={`svm-dimension-list-view-${i}`}
                                    />
                                  )
                              )}
                            </div>
                          )}
                        </div>
                        {/* ----- Dimension Card View End -----  */}
                      </React.Fragment>
                    )}
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </React.Fragment>
    );
  }
}

SVM.defaultProps = {
  server: null,
  shrink: false,
  handleSVMAvailablity: () => {},
  offeringId: null,
  fiscalYear: null,
  clientId: null,
  languageCode: null,
  theme: null,
};
SVM.propTypes = {
  server: PropTypes.string,
  shrink: PropTypes.bool,
  handleSVMAvailablity: PropTypes.func,
  offeringId: PropTypes.string,
  fiscalYear: PropTypes.string,
  readonly: PropTypes.bool,
  clientId: PropTypes.string,
  languageCode: PropTypes.string,
  theme: PropTypes.string,
};

export { SVM };
