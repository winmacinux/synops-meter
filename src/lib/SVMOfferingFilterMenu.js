/* eslint-disable */
import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ReactTooltip from "react-tooltip";
import BookmarkWhiteIcon from "./images/bookmarkWhite-icon.svg";
import BookmarkIcon from "./images/bookmarkBlue-icon.svg";
import DropDownToggle from "./images/dropDownToggle-icon.svg";
import RightAccordianIcon from "./images/rightAccordian-icon.svg";
import RightAccordianWhiteIcon from "./images/rightAccordianWhite-icon.svg";
import DownAccordianWhiteIcon from "./images/downAccordianWhite-icon.svg";
import i18n from "i18next";
import PropTypes from "prop-types";
import axiosInstance from "./axiosInstance";

class SVMOfferingFilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark: null,
      collapse: null,
      selected: null,
      offerings: [],
      clientId: sessionStorage.getItem("clientId"),
      languageCode: sessionStorage.getItem("languageCode"),
    };
  }

  componentDidMount() {
    this.loadOfferings();
    // Mapping Bookmark on Page Loading
    // if (this.props.bookmarkedOffering) {
    //   if (Array.isArray(this.props.offerings)) {
    //     const selectedOffering = this.props.offerings.filter(
    //       (o, i) => o.programId === this.props.bookmarkedOffering
    //     );
    //     if (selectedOffering.length) {
    //       const selected = selectedOffering[0].name;
    //       this.setState({
    //         selected,
    //         bookmark: this.props.bookmarkedOffering,
    //       });
    //     }
    //   }
    // } else {
    //   const selected = "Select Offering";
    //   this.setState({
    //     selected,
    //   });
    // }
  }

  loadOfferings = () => {
    if (this.state.clientId && this.state.languageCode)
      axiosInstance
        .get(
          `${this.props.server}/api/Svm/program-list?clientId=${this.state.clientId}&languageCode=${this.state.languageCode}`
        )
        .then((res) => {
          if (res.data.length) {
            let selectedOffering = res.data.filter((o, i) => o.isFavorite);
            let selected = null;
            let bookmark = null;

            if (selectedOffering.length) {
              selectedOffering = selectedOffering[0];
              selected = selectedOffering.programName;
              bookmark = selectedOffering.programId;
              this.props.onChange(selectedOffering.programId);
            } else {
              selected = res.data[0].programName;
              this.props.onChange(res.data[0].programId);
            }

            this.setState({
              offerings: [...res.data],
              selected,
              bookmark,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
  };

  handleBookmark = (e, programId) => {
    e.stopPropagation();
    e.preventDefault();

    const bookmark = !(this.state.bookmark === programId);

    axiosInstance
      .post(
        `${this.props.server}/api/Svm/favourite-program?clientId=${this.state.clientId}&programId=${programId}&languageCode=${this.state.languageCode}&isFavorite=${bookmark}`
      )
      .then((res) => {
        // Get the lastest data from the
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ bookmark: bookmark ? programId : null });
  };

  handleAccordian = (e, programId, subOffering) => {
    if (subOffering) {
      // e.stopPropagation();
      e.preventDefault();
      this.setState((old) => ({
        collapse: old.collapse !== programId ? programId : null,
      }));
    }
  };

  handleChange = (value) => {
    if (value && Array.isArray(this.state.offerings)) {
      const selectedOffering = this.state.offerings.filter(
        (o, i) => o.programId === value
      );

      if (selectedOffering.length) {
        const selected = selectedOffering[0].programName;

        this.setState({
          selected,
        });

        this.props.onChange(value);
      }
    }
  };

  render() {
    const { bookmark, selected, offerings } = this.state;

    return (
      <Dropdown className="custom-hover-dropdown mr-2">
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {selected} <img src={DropDownToggle} />
        </Dropdown.Toggle>

        <Dropdown.Menu  align='right'>
          {offerings?.map((o, i) => (
            <React.Fragment key={`svm-menu-dropdown-offerings-${i}`}>
              <Dropdown.Item onClick={() => this.handleChange(o.programId)}>
                {o.subOffering ? (
                  <React.Fragment                  
                  >
                    <a>
                      {this.state.collapse === o.programId ? (
                        <React.Fragment>
                        <img
                        className="right-black down"
                        src={RightAccordianIcon}
                      />
                        <img
                        className="right-white"
                        src={DownAccordianWhiteIcon}
                      />
                      </React.Fragment>
                      ) : (
                        <React.Fragment>
                        <img
                          className="right-black"
                          src={RightAccordianIcon}
                        />
                        <img
                          className="right-white"
                          src={RightAccordianWhiteIcon}
                        />
                      </React.Fragment>
                       
                      )}
                    </a>
                    <div data-toggle="collapse" data-target={`#collapseItem${i}`}  onClick={(e) => this.handleAccordian(e, o.programId, o.subOffering)}>{o.programName}</div>
                  </React.Fragment>
                ) : (
                  <div>{o.programName}</div>
                )}
                <a className="pl-3 bookmark" data-tip data-for='bookmark'>
                  {bookmark === o.programId ? (
                    <img
                      src={BookmarkIcon}
                      onClick={(e) => this.handleBookmark(e, o.programId)}
                    />
                  ) : (
                    <img
                      src={BookmarkWhiteIcon}
                      onClick={(e) => this.handleBookmark(e, o.programId)}
                    />
                  )}
                </a>
              </Dropdown.Item>
              {o.subOffering && (
                <div class="collapse dropdown-collapse" id={`collapseItem${i}`}>
                  {o.subOffering}
                </div>
              )}
            </React.Fragment>
          ))}
            <ReactTooltip
          place="left"
          type="dark"
          effect="solid"
          id="bookmark"
          className="dropdown-custom-tooltip"
        >
          <span>{i18n.t("Mark it as a default view")}</span>
        </ReactTooltip>
        </Dropdown.Menu>      
      </Dropdown>
    );
  }
}

SVMOfferingFilterMenu.defaultProps = {
  server: null,
  selected: "",
  onChange: () => {},
};

SVMOfferingFilterMenu.propTypes = {
  server: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
};

export { SVMOfferingFilterMenu };
