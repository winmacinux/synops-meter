import React, { Component } from "react";
import PropTypes from "prop-types";
import SVMProjectVerticalChart from "./SVMProjectVerticalChart";
// import { Tabs, Tab } from "react-bootstrap";
import { Tabs, Tab } from "@material-ui/core";
import CloseIcon from "./images/closeGrey-icon.svg";
import axiosInstance from "./axiosInstance";

class ProjectDetailsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
      projects: [],
      tabValue: 0,
    };
  }

  componentDidMount() {
    this.loadProjectDetails();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.activeProject !== this.state.activeProject) {
  //     this.loadProjectDetails();
  //   }
  // }

  loadProjectDetails = () => {
    axiosInstance
      .get(
        `${this.props.server}/api/Svm/project-details?clientId=${this.state.clientId}&languageCode=${this.state.languageCode}&fiscalYear=${this.props.fiscalYear}&programId=${this.props.programId}&dimension=${this.props.dimension}&subDimension=${this.props.subDimension}&boi=${this.props.boi}`
      )
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length) {
          this.setState({
            projects: [...res.data],
            // projects: [
            //   ...res.data.map((o) => ({
            //     ...o,
            //     fill1: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            //     fill2: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
            //   })),
            // ],
            // activeProject: res.data[0].project,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleTabChange = (e, key) => {
    this.setState({
      tabValue: key,
    });
  };

  render() {
    const { projects, tabValue } = this.state;
    const { boi } = this.props;

    return (
      <div className="project-details">
        <img
          className="float-right cursor"
          src={CloseIcon}
          onClick={this.props.onClose}
        />
        <h5>{boi}</h5>
        <div position="static" color="default">
          <Tabs
            className="project-detail-tabs mb-3"
            value={tabValue}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            // activeKey={activeProject}
            // onSelect={this.handleTabChange}
          >
            {projects.map((o, i) => (
              <Tab
                eventKey={`project${i}`}
                label={o.project}
                aria-controls={`scrollable-auto-tabpanel-${i}`}
                id={`scrollable-auto-tab-${i}`}
                key={`project-dimension-${o.project}-${i}`}
              ></Tab>
            ))}
          </Tabs>
        </div>
        {projects.map((o, i) => (
          <div
            role="tabpanel"
            hidden={tabValue !== i}
            id={`scrollable-auto-tabpanel-${i}`}
            value={tabValue}
            aria-labelledby={`scrollable-auto-tab-${i}`}
            key={`project-dimension-tabpanel-${o.project}-${i}`}
            index={i}
          >
            {tabValue === i && (
              <div>
                <p>{o.projectDescription}</p>
                <SVMProjectVerticalChart
                  dataset={[o.projectTargetValue, o.projectDeliveredValue]}
                  // colors={[o.fill1, o.fill2]}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
}

ProjectDetailsCard.defualtProps = {
  server: null,
  dimension: null,
  subDimension: null,
  programId: null,
  fiscalYear: null,
  boi: null,
  onClose: () => {},
};
ProjectDetailsCard.propTypes = {
  server: PropTypes.string,
  dimension: PropTypes.string,
  subDimension: PropTypes.string,
  programId: PropTypes.string,
  fiscalYear: PropTypes.string,
  boi: PropTypes.string,
  onClose: PropTypes.func,
};

export { ProjectDetailsCard };
export default ProjectDetailsCard;
