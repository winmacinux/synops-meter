"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMDoughNutChartV2 = exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireDefault(require("react"));

var _recharts = require("recharts");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const centre = [{
  name: "Centre",
  value: 1
}];
let newsubdimension = [{
  name: "",
  value: 0,
  color: "",
  dimensionId: ""
}];
const RADIAN = Math.PI / 180;
let outerRing = [];
let midRing = [];
const START_ANGLE = 90;
const END_ANGLE = 34;

class SVMDoughNutChartV2 extends _react.default.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "onPieEnter", (_, index) => {
      this.props.expandSubMenu(index); // this.setState({
      //   activeIndex: index,
      // });
    });

    _defineProperty(this, "renderCustomizedLabel", _ref => {
      let {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        index
      } = _ref;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      let a = 0;
      let b = 0;

      if (index === 0 || index === 3) {
        a = 30;
      } else if (index === 1) {
        a = 90;
      } else if (index === 4) {
        a = -90;
      } else {
        a = -35;
      }

      if (index == 2 || index == 3) {
        b = 15;
      } else {
        b = -15;
      }

      return /*#__PURE__*/_react.default.createElement("text", {
        x: x,
        y: y + b,
        scaleToFit: false,
        textAnchor: "middle",
        dominantBaseline: "central",
        style: {},
        fontSize: 12,
        fontWeight: 400,
        fill: "#000000",
        fontFamily: "Graphik-Regular",
        width: 12,
        transform: "rotate(" + a + " " + x + " " + y + ")"
      }, Array.isArray(this.props.dimensions) && this.props.dimensions[index] && this.props.dimensions[index].dimensionName);
    });

    _defineProperty(this, "renderCustomizedLabel1", _ref2 => {
      let {
        cx,
        cy,
        midAngle,
        startAngle,
        endAngle,
        innerRadius,
        outerRadius,
        index
      } = _ref2;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      const ar = innerRadius + (outerRadius - innerRadius) * 0.2;
      const ax = cx + ar * Math.cos(-midAngle * RADIAN);
      const ay = cy + ar * Math.sin(-midAngle * RADIAN);
      let a = 0;

      if ( // startAngle < -209 ||
      startAngle > 3 && startAngle < 91) {
        a = 10 + (index - 0.2) * 23;
      } else if (startAngle < -209) {
        a = 10 + (index - 0.2) * 22;
      } else if (startAngle < 4 && endAngle > -31) {
        a = 5 + (index - 0.2) * 23;
      } else if (startAngle < -149 && endAngle > -209) {
        a = 3 + (index - 0.2) * 23;
      } else if (startAngle < -30 && endAngle > -150) {
        a = 170 + (index - 0.2) * 25;
      } else {
        a = 5 + (index - 0.2) * 23;
      }

      let datalabel = this.props.subDimensions[index].name;
      let label = [];
      let searchKey = datalabel.search("&");

      if (searchKey > -1) {
        label.push(datalabel.slice(0, searchKey + 1));
        label.push(datalabel.slice(searchKey + 1));
      } else {
        label = datalabel.split(" ");
      }

      return (
        /*#__PURE__*/

        /*SubDimnension*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("text", {
          x: x,
          y: y,
          fill: "black",
          textAnchor: "middle",
          dominantBaseline: "top",
          scaleToFit: true,
          fontSize: 9,
          fontWeight: 500,
          width: 12,
          transform: "rotate(" + a + " " + x + " " + y + ")"
        }, /*#__PURE__*/_react.default.createElement("tspan", {
          x: x,
          y: y - 5,
          alignmentBaseline: "middle",
          fontSize: "8"
        }, label[0]), /*#__PURE__*/_react.default.createElement("tspan", {
          fontSize: "8",
          x: x,
          y: y + 5
        }, label[1])), /*#__PURE__*/_react.default.createElement("circle", {
          cx: ax,
          cy: ay,
          r: 3,
          fill: this.props.subDimensions[index].fill,
          stroke: "none"
        }))
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
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("text", {
        x: "51%",
        y: "0%",
        dy: 13,
        textAnchor: "middle",
        fontSize: 30,
        fontWeight: 500,
        fill: "#440073",
        fontFamily: "Graphik-Medium"
      }, "360\xB0"), /*#__PURE__*/_react.default.createElement("text", {
        x: "50%",
        y: "5%",
        dy: 5,
        textAnchor: "middle",
        fontSize: 18,
        fontWeight: 500,
        fill: "#440073",
        fontFamily: "Graphik-Medium"
      }, "Value"));
    });

    this.state = {
      activeIndex: null,
      dimensionsChart: [],
      subDimensionsChart: [],
      subDimensionStartAngle: 90,
      subDimensionEndAngle: 34
    };
  }

  componentDidMount() {
    const dimensionsChart = this.props.dimensions && this.props.dimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
      fill: o.id % 2 === 0 ? "#eff2f5" : "#e2e2e2"
    }));
    const subDimensionsChart = this.props.subDimensions && this.props.subDimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
      fill: o.dimensionId % 2 === 0 ? "#eff2f5" : "#e2e2e2"
    }));
    this.setState({
      dimensionsChart,
      subDimensionsChart
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props && prevProps.dimensions !== this.props.dimensions) {
      const dimensionsChart = this.props.dimensions && this.props.dimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
        fill: i % 2 === 0 ? "#eff2f5" : "#e2e2e2"
      }));
      this.setState({
        dimensionsChart
      });
    }

    if (prevProps.expand !== this.props.expand) {
      const subDimensionsChart = this.props.subDimensions.map((o, i) => _objectSpread(_objectSpread({}, o), {}, {
        fill: i % 2 === 0 ? "#eff2f5" : "#e2e2e2"
      }));
      this.setState({
        subDimensionsChart
      });
    }
  }

  render() {
    const {
      dimensions,
      subDimensions,
      expand,
      selectedDimension
    } = this.props;
    const {
      activeIndex,
      dimensionsChart,
      subDimensionsChart,
      subDimensionStartAngle,
      subDimensionEndAngle
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
      cx: "50%",
      cy: "0%",
      startAngle: 90,
      endAngle: -270,
      innerRadius: "27%",
      outerRadius: "62%",
      paddingAngle: 4,
      onClick: this.onPieEnter,
      label: this.renderCustomizedLabel,
      labelLine: false,
      isAnimationActive: false,
      animationEasing: "ease-out"
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: dimensions,
      cx: "50%",
      cy: "0%",
      startAngle: 90,
      endAngle: -270,
      innerRadius: "64%",
      outerRadius: "68%",
      paddingAngle: 4,
      isAnimationActive: false
    }), !expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: centre,
      cx: "50%",
      cy: "0%",
      innerRadius: "70%",
      outerRadius: "70.2%",
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
      cx: "50%",
      cy: "0%",
      innerRadius: "70.2%",
      outerRadius: "92%",
      paddingAngle: 2,
      label: this.renderCustomizedLabel1 //   onClick={onSubDimensionCick}
      ,
      labelLine: false,
      isAnimationActive: false,
      animationDuration: 500,
      animationEasing: "ease-out"
    }), expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      startAngle: subDimensionStartAngle,
      endAngle: subDimensionEndAngle,
      data: subDimensions,
      cx: "50%",
      cy: "0%",
      innerRadius: "93%",
      outerRadius: "96%",
      paddingAngle: 2,
      isAnimationActive: false,
      animationDuration: 500,
      animationEasing: "ease-out"
    }), expand && /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: subDimensions,
      startAngle: subDimensionStartAngle,
      endAngle: subDimensionEndAngle,
      cx: "50%",
      cy: "0%",
      innerRadius: "98%",
      outerRadius: "99%",
      paddingAngle: 2,
      isAnimationActive: false
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: dimensions,
      cx: "50%",
      cy: "0%",
      startAngle: 88,
      endAngle: -275,
      innerRadius: "25%",
      outerRadius: "27%",
      label: this.renderCustomizedLabel2,
      isAnimationActive: false,
      paddingAngle: 0,
      labelLine: false,
      stroke: ""
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: centre,
      cx: "50%",
      cy: "0%",
      innerRadius: "35%",
      outerRadius: "35.2%",
      isAnimationActive: false,
      fill: "#7400c0",
      paddingAngle: 0,
      labelLine: false,
      stroke: ""
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
  subDimensions: []
};
SVMDoughNutChartV2.propTypes = {
  title: _propTypes.default.string,
  selectedDimension: _propTypes.default.number,
  expand: _propTypes.default.bool,
  expandSubMenu: _propTypes.default.func,
  subDimensions: _propTypes.default.arrayOf(_propTypes.default.string),
  dimensions: _propTypes.default.arrayOf(_propTypes.default.shape({
    dimensionName: _propTypes.default.string,
    value: _propTypes.default.number,
    subDimension: _propTypes.default.arrayOf(_propTypes.default.string),
    fill: _propTypes.default.string
  }))
};