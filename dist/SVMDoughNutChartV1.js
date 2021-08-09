"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SVMDoughNutChartV1 = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _recharts = require("recharts");

var _GlobeSVMIcon = _interopRequireDefault(require("./images/GlobeSVM-icon.svg"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

let centre = [{
  name: "Centre",
  value: 1
}];
let newsubdimension = [{
  name: "",
  value: 0,
  color: "",
  DimID: ""
}];
const RADIAN = Math.PI / 180;
let outerRing = [];
let midRing = [];

class SVMDoughNutChartV1 extends _react.default.Component {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "onPieEnter", (_, index) => {
      this.setState({
        activeIndex: index
      });
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

      if (index == 0 || index == 3) {
        a = 0;
      } else if (index == 1 || index == 4) {
        a = 60;
      } else {
        a = -60;
      }

      return /*#__PURE__*/_react.default.createElement("text", {
        x: x,
        y: y,
        fill: "white",
        scaleToFit: false,
        textAnchor: "middle",
        dominantBaseline: "central",
        style: {},
        fontSize: 12,
        width: 12,
        transform: "rotate(" + a + " " + x + " " + y + ")"
      }, this.props.dimension[index].name);
    });

    _defineProperty(this, "renderCustomizedLabel1", _ref2 => {
      let {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        index
      } = _ref2;
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);
      let a = 0;

      if (newsubdimension.length === 1) {
        a = 0;
      } else if (newsubdimension.length === 2) {
        a = 15 - (newsubdimension.length - index) * 15 * (1 - index);
      } else if (newsubdimension.length === 3) {
        a = (index + 1) * 15 - (newsubdimension.length - 1) * 15;
      } else if (newsubdimension.length === 4) {
        a = 270 + (index - 1.5) * 15;
      } else if (newsubdimension.length === 5) {
        a = 270 + (index - 2) * 12.5;
      } else {
        a = 270 + (index - 2.5) * 10;
      }

      return (
        /*#__PURE__*/

        /*SubDimnension*/
        _react.default.createElement("text", {
          x: x,
          y: y,
          fill: "white",
          textAnchor: "middle",
          dominantBaseline: "top",
          scaleToFit: true,
          fontSize: 9,
          width: 12,
          transform: "rotate(" + a + " " + x + " " + y + ")"
        }, newsubdimension[index].name)
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

    _defineProperty(this, "renderCustomizedLabel2", () => // cx,
    // cy,
    // midAngle,
    // innerRadius,
    // outerRadius,
    {
      // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      // const x = cx + radius * Math.cos(-midAngle * RADIAN);
      // const y = cy + radius * Math.sin(-midAngle * RADIAN);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("svg", {
        x: "42%",
        y: "35%",
        dy: 5,
        textAnchor: "middle",
        width: "15%",
        height: "15%"
      }, /*#__PURE__*/_react.default.createElement("image", {
        href: _GlobeSVMIcon.default,
        height: "100%",
        width: "100%"
      })), /*#__PURE__*/_react.default.createElement("text", {
        x: "43%",
        y: "51%",
        scaleToFit: true,
        style: {
          color: "rgb(33, 43, 54)",
          fontFamily: "Graphik-Semibold",
          // fontSize: "20px",
          fontWeight: "600"
        }
      }, " ", "SynOps"), /*#__PURE__*/_react.default.createElement("text", {
        x: "40%",
        y: "55%",
        scaleToFit: true,
        style: {
          color: "rgb(33, 43, 54)",
          fontFamily: "Graphik-Semibold",
          // fontSize: "20px",
          fontWeight: "600"
        }
      }, " ", "Value Meter"));
    });

    this.state = {
      activeIndex: 0
    };
  }

  render() {
    const {
      dimension
    } = this.props;
    const {
      activeIndex
    } = this.state;
    return /*#__PURE__*/_react.default.createElement(_recharts.ResponsiveContainer, {
      width: "125%",
      height: "100%",
      id: "wheel-chart-container"
    }, /*#__PURE__*/_react.default.createElement(_recharts.PieChart, null, /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: dimension,
      dataKey: "value",
      startAngle: 116,
      endAngle: -240,
      innerRadius: "35%",
      outerRadius: "71%",
      paddingAngle: 4 // onClick={onPieEnter}
      ,
      label: this.renderCustomizedLabel,
      labelLine: false,
      isAnimationActive: false,
      animationEasing: "ease-out"
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      renderActiveShape: {},
      startAngle: 116,
      endAngle: 60,
      data: newsubdimension,
      outerRadius: "110%",
      innerRadius: "81%",
      paddingAngle: 2,
      label: this.renderCustomizedLabel1 //   onClick={onSubDimensionCick}
      ,
      labelLine: false,
      isAnimationActive: false,
      animationDuration: 500,
      animationEasing: "ease-out"
    }), /*#__PURE__*/_react.default.createElement(_recharts.Pie, {
      activeIndex: activeIndex,
      activeShape: this.renderActiveShape,
      data: centre,
      innerRadius: "29%",
      outerRadius: "31%",
      label: this.renderCustomizedLabel2,
      isAnimationActive: false,
      fill: "#ab65b5",
      paddingAngle: 0,
      labelLine: false,
      stroke: ""
    })));
  }

}

exports.SVMDoughNutChartV1 = exports.default = SVMDoughNutChartV1;
SVMDoughNutChartV1.defaultProps = {
  title: "SynOps Value Meter",
  dimension: [{
    name: "Financial",
    value: 500
  }, {
    name: "Experience",
    value: 300
  }, {
    name: "Sustainaibility",
    value: 300
  }, {
    name: "Talent",
    value: 200
  }, {
    name: "Inclusio & Diversity",
    value: 500
  }, {
    name: "Custom",
    value: 500
  }]
};
SVMDoughNutChartV1.propTypes = {
  title: _propTypes.default.string
};