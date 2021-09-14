"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMDoughNutChartV2 = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recharts = require("recharts");

var _propTypes = _interopRequireDefault(require("prop-types"));

const _excluded = ["cx", "cy", "midAngle", "startAngle", "endAngle", "innerRadius", "outerRadius", "index"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const centre = [{
  name: "Centre",
  value: 1
}];
const RADIAN = Math.PI / 180;
const data01 = [{
  name: "Financial",
  value: 300,
  fill: "#B455AA"
}, {
  name: "Experience",
  value: 300,
  fill: "#A055F5"
}, {
  name: "Sustainability",
  value: 300,
  fill: "#595959"
}, {
  name: "Talent",
  value: 300,
  fill: "#460073"
}, {
  name: "Inclusion & Diversity",
  value: 300,
  fill: "#7500C1"
}, {
  name: "Custom",
  value: 300,
  fill: "#A100FF"
}];

class SVMDoughNutChartV2 extends _react.default.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "dimensionLabel", props => {
      const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        midAngle,
        index,
        outerRadius,
        startAngle,
        endAngle,
        payload
      } = props;
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius - 34) * cos;
      const sy = cy + (outerRadius - 34) * sin; // const angle = [176, 536, -184, -544, 896].includes(
      //   parseInt(startAngle + endAngle)
      // )
      //   ? 0
      //   : startAngle + endAngle + 8;

      const angle = midAngle > 420 && midAngle < 480 || midAngle > 240 && midAngle < 300 || midAngle > 600 && midAngle < 660 ? 0 : startAngle + endAngle + 8;
      return /*#__PURE__*/_react.default.createElement("g", {
        cursor: this.props.dimensions[index] && this.props.dimensions[index].isActive ? "pointer" : "inherit"
      }, /*#__PURE__*/_react.default.createElement(_recharts.Text, {
        x: sx,
        y: sy,
        textAnchor: "middle",
        angle: 90 - midAngle,
        fontSize: 12,
        fontWeight: 500,
        fill: "#000000",
        opacity: this.props.dimensions[index] && this.props.dimensions[index].opacity,
        fontFamily: "Graphik-Medium",
        width: 12,
        onClick: e => this.onPieEnter(e, index)
      }, payload.dimensionName));
    });

    _defineProperty(this, "onPieEnter", (_, index) => {
      this.props.expandSubMenu(index);
    });

    _defineProperty(this, "onSubDimensionClick", (o, index) => {
      // this.props.switchSubDimension(index);
      this.props.switchSubDimension(o.index);
    });

    _defineProperty(this, "renderCustomizedLabel1", _ref => {
      let {
        cx,
        cy,
        midAngle,
        startAngle,
        endAngle,
        innerRadius,
        outerRadius,
        index
      } = _ref,
          props = _objectWithoutProperties(_ref, _excluded);

      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const ar = innerRadius + (outerRadius - innerRadius) * 0.2;
      const ax = cx + ar * Math.cos(-midAngle * RADIAN);
      const ay = cy + ar * Math.sin(-midAngle * RADIAN);
      const sin = Math.sin(-RADIAN * midAngle);
      const cos = Math.cos(-RADIAN * midAngle);
      const sx = cx + (outerRadius - 34) * cos;
      const sy = cy + (outerRadius - 34) * sin;
      let datalabel = this.props.subDimensions.length - 1 >= index ? this.props.subDimensions[index].name : "";
      return (
        /*#__PURE__*/

        /*SubDimnension*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_recharts.Text, {
          x: sx,
          y: sy,
          angle: 90 - midAngle,
          textAnchor: "middle",
          verticalAnchor: "end",
          fontSize: 10,
          fontWeight: 400,
          fill: "#020000",
          opacity: "0.8",
          fontFamily: "Graphik-Medium",
          width: 12,
          onClick: () => this.onSubDimensionClick(null, index)
        }, datalabel), /*#__PURE__*/_react.default.createElement("circle", {
          cx: ax,
          cy: ay + 5,
          r: 4,
          fill: "#b455aa",
          stroke: "none",
          cursor: "pointer",
          onClick: () => this.onSubDimensionClick(null, index)
        })) // <>
        //   <text
        //     x={x}
        //     y={y}
        //     textAnchor="middle"
        //     dominantBaseline="top"
        //     scaleToFit={true}
        //     fontSize={10}
        //     fontWeight={400}
        //     fill="#020000"
        //     fontFamily={"Graphik-Regular"}
        //     width={12}
        //     cursor="pointer"
        //     onClick={() => this.onSubDimensionClick(null, index)}
        //     transform={"rotate(" + a + " " + x + " " + y + ")"}
        //   >
        //     <tspan x={x} y={y - 5} alignmentBaseline="middle" fontSize="8">
        //       {label[0]}
        //     </tspan>
        //     <tspan fontSize="8" x={x} y={y + 5}>
        //       {label[1]}
        //     </tspan>
        //   </text>
        //   <circle
        //     cx={ax}
        //     cy={ay + 5}
        //     r={4}
        //     fill="#b455aa"
        //     stroke="none"
        //     cursor="pointer"
        //     onClick={() => this.onSubDimensionClick(null, index)}
        //   />
        // </>

      );
    });

    _defineProperty(this, "renderActiveShape", props => {
      // const RADIAN = Math.PI / 180;
      const {
        cx,
        cy,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill
      } = props;
      return /*#__PURE__*/_react.default.createElement("g", null, /*#__PURE__*/_react.default.createElement(_recharts.Sector, {
        cx: cx,
        cy: cy,
        innerRadius: innerRadius + 1,
        outerRadius: outerRadius,
        startAngle: startAngle,
        endAngle: endAngle,
        fill: fill
      }));
    });

    _defineProperty(this, "renderCustomizedLabel2", () => {
      const {
        expand
      } = this.props;
      return /*#__PURE__*/_react.default.createElement("g", {
        cursor: expand ? "pointer" : ""
      }, /*#__PURE__*/_react.default.createElement("text", {
        x: "48%",
        y: "0%",
        dy: 3,
        textAnchor: "middle",
        fontSize: 30,
        fontWeight: 500,
        fill: this.props.theme === "1" ? "#ffffff" : "#440073",
        fontFamily: "Graphik-Medium",
        onClick: this.onPieEnter
      }, "360", /*#__PURE__*/_react.default.createElement("tspan", {
        fontSize: 16,
        x: "56.5%",
        y: "-2%"
      }, "\xB0")), /*#__PURE__*/_react.default.createElement("text", {
        x: "47.5%",
        y: "4%",
        dy: 3,
        textAnchor: "middle",
        fontSize: 18,
        fontWeight: 500,
        fill: this.props.theme === "1" ? "#ffffff" : "#440073",
        fontFamily: "Graphik-Medium",
        onClick: this.onPieEnter
      }, "value"));
    });

    this.state = {
      activeIndex: null,
      startAngle: 60,
      dimensionsChart: [],
      subDimensionsChart: [],
      subDimensionStartAngle: 60,
      subDimensionEndAngle: 120,
      subDimensionEndAngle: 115,
      circle: [{
        value: 100
      }]
    };
  }

  componentDidMount() {
    // this.setState((state) => ({
    //   circle: [
    //     {
    //       ...state.circle[0],
    //       fill: this.props.theme == "1" ? "#000000" : "#FFFFFF",
    //     },
    //   ],
    // }));
    const dimensionsChart = this.props.dimensions && this.props.dimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
      fill: this.props.theme === "1" ? "#b5c0ca" : o.id % 2 === 0 ? "#eff2f5" : "#e2e2e2"
    }));
    const subDimensionsChart = this.props.subDimensions && this.props.subDimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
      fill: this.props.theme === "1" ? "#b5c0ca" : "#eff2f5"
    }));
    this.setState({
      dimensionsChart,
      subDimensionsChart
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props && prevProps.dimensions !== this.props.dimensions) {
      const dimensionsChart = this.props.dimensions && this.props.dimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
        fill: this.props.theme === "1" ? "#b5c0ca" : i % 2 === 0 ? "#eff2f5" : "#e2e2e2"
      }));
      this.setState({
        dimensionsChart
      });
    }

    if (this.props.selectedDimension !== prevProps.selectedDimension && (prevProps.expand !== this.props.expand || prevProps.subDimensions !== this.props.subDimensions)) {
      const subDimensionsChart = this.props.subDimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
        fill: this.props.theme === "1" ? "#b5c0ca" : "#eff2f5"
      }));
      this.setState({
        subDimensionsChart
      });

      if (this.props.expand && this.props.selectedDimension) {
        this.setState(state => ({
          startAngle: state.startAngle - this.props.selectedDimension * 60
        }));
      } else {
        this.setState({
          startAngle: 60
        });
      }
    }
  }

  render() {
    const {
      dimensions,
      subDimensions,
      expand,
      theme
    } = this.props;
    const {
      activeIndex,
      dimensionsChart,
      subDimensionsChart,
      subDimensionStartAngle,
      subDimensionEndAngle,
      startAngle,
      circle
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_recharts.ResponsiveContainer, {
      width: "100%",
      height: "100%",
      id: "wheel-chart-container",
      className: "svm-dough-nut-chart"
    }, /*#__PURE__*/_react.default.createElement(_recharts.PieChart, null, /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: dimensionsChart,
      dataKey: "value",
      cx: "48%",
      cy: "0%",
      startAngle: 536 - startAngle,
      endAngle: 0 - startAngle,
      innerRadius: "30%",
      outerRadius: "78%",
      paddingAngle: 4,
      onClick: this.onPieEnter,
      label: this.dimensionLabel,
      labelLine: false,
      isAnimationActive: false,
      animationEasing: "ease-out",
      stroke: ""
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: dimensions,
      cx: "48%",
      cy: "0%" // startAngle={startAngle}
      // endAngle={360 + startAngle}
      ,
      startAngle: 536 - startAngle,
      endAngle: 0 - startAngle,
      innerRadius: "82%",
      outerRadius: "86%",
      paddingAngle: 4,
      isAnimationActive: false,
      stroke: ""
    }), !expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: centre,
      cx: "48%",
      cy: "0%",
      innerRadius: "90%",
      outerRadius: "90.5%",
      isAnimationActive: false,
      fill: "#7400c0",
      paddingAngle: 0,
      labelLine: false,
      stroke: ""
    }), expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      renderActiveShape: {},
      startAngle: subDimensionStartAngle,
      endAngle: subDimensionEndAngle,
      data: subDimensionsChart // data={subDimensions}
      ,
      cx: "48%",
      cy: "0%",
      innerRadius: "90%",
      outerRadius: "120%",
      paddingAngle: 2,
      label: this.renderCustomizedLabel1,
      onClick: this.onSubDimensionClick,
      labelLine: false,
      isAnimationActive: false,
      animationDuration: 1000,
      animationEasing: "ease-out",
      stroke: "",
      cursor: "pointer"
    }), expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      startAngle: subDimensionStartAngle,
      endAngle: subDimensionEndAngle,
      data: subDimensions,
      cx: "48%",
      cy: "0%",
      innerRadius: "124%",
      outerRadius: "127%",
      paddingAngle: 2,
      isAnimationActive: false,
      animationDuration: 500,
      animationEasing: "ease-out",
      stroke: ""
    }), expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: centre,
      startAngle: subDimensionStartAngle,
      endAngle: subDimensionEndAngle,
      cx: "48%",
      cy: "0%",
      innerRadius: "131%",
      outerRadius: "132%",
      paddingAngle: 2,
      fill: "#7400c0",
      isAnimationActive: false,
      stroke: ""
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: circle,
      cx: "48%",
      cy: "0%",
      startAngle: startAngle,
      endAngle: 360 + startAngle,
      innerRadius: "0%",
      outerRadius: "30%",
      label: this.renderCustomizedLabel2,
      fill: "transparent",
      onClick: e => this.onPieEnter(e, null),
      isAnimationActive: false,
      paddingAngle: 0,
      labelLine: false,
      stroke: "",
      cursor: expand ? "pointer" : ""
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: data01,
      cx: "48%",
      cy: "0%",
      startAngle: startAngle,
      endAngle: 360 + startAngle,
      innerRadius: "30%",
      outerRadius: "32%",
      label: this.renderCustomizedLabel2,
      onClick: this.onPieEnter,
      isAnimationActive: false,
      paddingAngle: 0,
      labelLine: false,
      stroke: ""
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: centre,
      cx: "48%",
      cy: "0%",
      innerRadius: "45%",
      outerRadius: "45.5%",
      isAnimationActive: false,
      fill: "#7400c0",
      paddingAngle: 0,
      labelLine: false,
      stroke: "",
      onClick: this.onPieEnter
    })));
  }

}

exports.SVMDoughNutChartV2 = exports.default = SVMDoughNutChartV2;
SVMDoughNutChartV2.defaultProps = {
  title: "SynOps Value Meter",
  selectedDimension: null,
  dimensions: [],
  expand: false,
  expandSubMenu: () => {},
  switchSubDimension: () => {},
  subDimensions: []
};
SVMDoughNutChartV2.propTypes = {
  title: _propTypes.default.string,
  selectedDimension: _propTypes.default.number,
  expand: _propTypes.default.bool,
  expandSubMenu: _propTypes.default.func,
  switchSubDimension: _propTypes.default.func,
  subDimensions: _propTypes.default.arrayOf(_propTypes.default.string),
  dimensions: _propTypes.default.arrayOf(_propTypes.default.shape({
    dimensionName: _propTypes.default.string,
    value: _propTypes.default.number,
    subDimension: _propTypes.default.arrayOf(_propTypes.default.string),
    fill: _propTypes.default.string
  }))
};