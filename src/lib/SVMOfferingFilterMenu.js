/* eslint-disable */
import React, { Component, createRef } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ReactTooltip from "react-tooltip";
import BookmarkWhiteIcon from "./images/bookmarkWhite-icon.svg";
import BookmarkIcon from "./images/bookmarkBlue-icon.svg";
import DropDownToggle from "./images/dropDownToggle-icon.svg";
import RightAccordianIcon from "./images/rightAccordian-icon.svg";
import RightAccordianWhiteIcon from "./images/rightAccordianWhite-icon.svg";
import DownAccordianWhiteIcon from "./images/downAccordianWhite-icon.svg";
import i18n from "i18next";
import CaretIcon from "./images/rightarrow-blue.svg";
import WhiteCaretIcon from "./images/headerAngleDown-icon.svg";
import PropTypes from "prop-types";
import axiosInstance from "./axiosInstance";
import $ from "jquery";

class SVMOfferingFilterMenu extends Component {
  wrapperRef = createRef();
  constructor(props) {
    super(props);
    this.state = {
      bookmark: null,
      collapse: [],
      selected: "Loading... ",
      offerings: [],
      selectedSubOffering: null,
    };
  }

  componentDidMount() {
    if (this.props.readonly) {
      this.setState({
        selected: this.props.fixedProgramName
          ? this.props.fixedProgramName
          : "No Programs",
      });
    } else {
      this.loadOfferings();
    }
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.readonly &&
      prevProps.fixedProgramName !== this.props.fixedProgramName
    ) {
      this.setState({
        selected: this.props.fixedProgramName
          ? this.props.fixedProgramName
          : "No Programs",
      });
    }
  }

  loadOfferings = () => {
    if (this.props.clientId && this.props.languageCode)
      axiosInstance
        .get(
          `${this.props.server}Svm/program-list?clientId=${this.props.clientId}&languageCode=${this.props.languageCode}`
        )
        .then((res) => {
          if (res.data.length) {
            let selectedOffering = res.data.filter((o, i) => o.isFavorite);
            let selected = null;
            let bookmark = null;
            let selectedSubOffering = null;

            if (selectedOffering.length) {
              selectedOffering = selectedOffering[0];
              selected = selectedOffering.programName;
              bookmark = selectedOffering.programId;
              selectedSubOffering = selectedOffering.subOffering
                ? selectedOffering.subOffering
                : null;
              this.props.onChange(selectedOffering.programId);
            } else {
              selected = res.data[0] && res.data[0].programName;
              selectedSubOffering =
                res.data[0] && res.data[0].subOffering
                  ? res.data[0].subOffering
                  : null;
              this.props.onChange(res.data[0].programId);
            }

            this.setState({
              offerings: [...res.data],
              selected,
              bookmark,
              selectedSubOffering,
            });
          } else {
            this.setState({
              selected: "No Programs",
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
        `${this.props.server}Svm/favourite-program?clientId=${this.props.clientId}&programId=${programId}&languageCode=${this.props.languageCode}&isFavorite=${bookmark}`
      )
      .then((res) => {
        // Get the lastest data from the
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({ bookmark: bookmark ? programId : null });
  };

  handleAccordian = (e, programId, subOffering, index) => {
    if (subOffering) {
      e.preventDefault();
      e.stopPropagation();
      const isExpanded = this.state.collapse.includes(programId);
      $(`.collapse.collapseItem${index}`).collapse(
        isExpanded ? "hide" : "show"
      );
      this.setState((old) => ({
        collapse: isExpanded
          ? old.collapse.filter((o) => o != programId)
          : [...old.collapse, programId],
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
        const selectedSubOffering = selectedOffering[0].subOffering
          ? selectedOffering[0].subOffering
          : null;

        this.setState({
          selected,
          selectedSubOffering,
        });

        this.props.onChange(value);
      }
    }
    this.setState({ subMenuOpen1: !this.state.subMenuOpen1 });
  };

  onClicksubmenu1 = () =>
    this.setState({ subMenuOpen1: !this.state.subMenuOpen1 });

  handleClickOutside = (event) => {
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(event.target)
    ) {
      this.setState({ subMenuOpen1: false });
    }
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  render() {
    const { bookmark, selected, offerings, selectedSubOffering } = this.state;
    const { theme, readonly } = this.props;

    return (
      <Dropdown className="custom-hover-dropdown mr-2">
        {selectedSubOffering && (
          <ReactTooltip
            place="left"
            type="dark"
            effect="solid"
            id="OfferingTooltip"
            className="svm-offering-tooltip"
          >
            <span>{i18n.t(selectedSubOffering)}</span>
          </ReactTooltip>
        )}{" "}
        <div onClick={this.onClicksubmenu1}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            className={readonly && "no-filter-disable"}
            disabled={readonly}
            data-tip
            data-for="OfferingTooltip"
          >
            {selected}
            {theme === "1" ? (
              <>
                {" "}
                <img className={this.state.subMenuOpen1 ? "reverse arrow_icon" : "arrow_icon"} src={CaretIcon} />
                <img className={this.state.subMenuOpen1 ? "reverse-icon white_icon" : "white_icon"} src={WhiteCaretIcon} />
              </>
            ) : (
              <img
                className={this.state.subMenuOpen1 ? "reverse-icon" : ""}
                src={DropDownToggle}
              />
            )}
          </Dropdown.Toggle>
        </div>
        <Dropdown.Menu
          align="right"
          className="padding-dropdown"
          ref={this.wrapperRef}
        >
          {offerings?.map((o, i) => (
            <React.Fragment key={`svm-menu-dropdown-offerings-${i}`}>
              <Dropdown.Item onClick={() => this.handleChange(o.programId)}>
                <div className="d-flex">
                  {o.subOffering ? (
                    <React.Fragment>
                      <div className="toggler"  data-toggle="collapse"
                              data-target={`#collapseItem${i}`}   onClick={(e) =>
                                this.handleAccordian(
                                  e,
                                  o.programId,
                                  o.subOffering,
                                  i
                                )
                              }>
                        {this.state.collapse.includes(o.programId) ? (
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
                              onClick={(e) =>
                                this.handleAccordian(
                                  e,
                                  o.programId,
                                  o.subOffering,
                                  i
                                )
                              }
                              data-toggle="collapse"
                              data-target={`#collapseItem${i}`}
                              src={RightAccordianIcon}
                            />
                            <img
                              className="right-white"
                              onClick={(e) =>
                                this.handleAccordian(
                                  e,
                                  o.programId,
                                  o.subOffering,
                                  i
                                )
                              }
                              data-toggle="collapse"
                              data-target={`#collapseItem${i}`}
                              src={RightAccordianWhiteIcon}
                            />
                          </React.Fragment>
                        )}
                      </div>
                      <div>{o.programName}</div>
                    </React.Fragment>
                  ) : (
                    <div>{o.programName}</div>
                  )}
                </div>
                <a className="px-2 bookmark" data-tip data-for="bookmark">
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
                <div
                  className={`collapse dropdown-collapse collapseItem${i}`}
                  id={`collapseItem${i}`}
                >
                  {o.subOffering}
                </div>
              )}
            </React.Fragment>
          ))}
          <ReactTooltip
            place="bottom"
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
  clientId: null,
  languageCode: null,
  theme: null,
  readonly: false,
  fixedProgramName: null,
};

SVMOfferingFilterMenu.propTypes = {
  server: PropTypes.string,
  selected: PropTypes.string,
  onChange: PropTypes.func,
  clientId: PropTypes.string,
  languageCode: PropTypes.string,
  theme: PropTypes.string,
  readonly: PropTypes.bool,
  fixedProgramName: PropTypes.string,
};

export { SVMOfferingFilterMenu };
