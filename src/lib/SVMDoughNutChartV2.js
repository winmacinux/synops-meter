/* eslint-disable */
import React from "react";
import { PieChart, ResponsiveContainer, Pie, Sector } from "recharts";
import PropTypes from "prop-types";

const centre = [{ name: "Centre", value: 1 }];
let newsubdimension = [{ name: "", value: 0, color: "", dimensionId: "" }];
const RADIAN = Math.PI / 180;

let outerRing = [];
let midRing = [];

const START_ANGLE = 90;
const END_ANGLE = 34;

export default class SVMDoughNutChartV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      dimensionsChart: [],
      subDimensionsChart: [],
      subDimensionStartAngle: 90,
      subDimensionEndAngle: 34,
    };
  }

  componentDidMount() {
    const dimensionsChart =
      this.props.dimensions &&
      this.props.dimensions.map((o, i) => ({
        ...o,
        fill: o.id % 2 === 0 ? "#eff2f5" : "#e2e2e2",
      }));
    const subDimensionsChart =
      this.props.subDimensions &&
      this.props.subDimensions.map((o, i) => ({
        ...o,
        fill: o.dimensionId % 2 === 0 ? "#eff2f5" : "#e2e2e2",
      }));

    this.setState({
      dimensionsChart,
      subDimensionsChart,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props && prevProps.dimensions !== this.props.dimensions) {
      const dimensionsChart =
        this.props.dimensions &&
        this.props.dimensions.map((o, i) => ({
          ...o,
          fill: i % 2 === 0 ? "#eff2f5" : "#e2e2e2",
        }));
      this.setState({
        dimensionsChart,
      });
    }

    if (prevProps.expand !== this.props.expand) {
      const subDimensionsChart = this.props.subDimensions.map((o, i) => ({
        ...o,
        fill: i % 2 === 0 ? "#eff2f5" : "#e2e2e2",
      }));
      this.setState({
        subDimensionsChart,
      });
    }
  }

  onPieEnter = (_, index) => {
    this.props.expandSubMenu(index);
    // this.setState({
    //   activeIndex: index,
    // });
  };

  renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
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

    return (
      <text
        x={x}
        y={y + b}
        scaleToFit={false}
        textAnchor="middle"
        dominantBaseline="central"
        style={{}}
        fontSize={12}
        fontWeight={400}
        fill="#000000"
        fontFamily={"Graphik-Regular"}
        width={12}
        transform={"rotate(" + a + " " + x + " " + y + ")"}
      >
        {Array.isArray(this.props.dimensions) &&
          this.props.dimensions[index] &&
          this.props.dimensions[index].dimensionName}
      </text>
    );
  };

  renderCustomizedLabel1 = ({
    cx,
    cy,
    midAngle,
    startAngle,
    endAngle,
    innerRadius,
    outerRadius,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const ar = innerRadius + (outerRadius - innerRadius) * 0.2;
    const ax = cx + ar * Math.cos(-midAngle * RADIAN);
    const ay = cy + ar * Math.sin(-midAngle * RADIAN);
    let a = 0;

    if (
      // startAngle < -209 ||
      startAngle > 3 &&
      startAngle < 91
    ) {
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
      /*SubDimnension*/
      <React.Fragment>
        <text
          x={x}
          y={y}
          fill="black"
          textAnchor="middle"
          dominantBaseline="top"
          scaleToFit={true}
          fontSize={9}
          fontWeight={500}
          width={12}
          transform={"rotate(" + a + " " + x + " " + y + ")"}
        >
          <tspan x={x} y={y - 5} alignmentBaseline="middle" fontSize="8">
            {label[0]}
          </tspan>
          <tspan fontSize="8" x={x} y={y + 5}>
            {label[1]}
          </tspan>
        </text>
        <circle
          cx={ax}
          cy={ay}
          r={3}
          fill={this.props.subDimensions[index].fill}
          stroke="none"
        />
      </React.Fragment>
    );
  };

  renderActiveShape = (props) => {
    // const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
    } = props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius + 1}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  renderCustomizedLabel2 = () => {
    return (
      <>
        <text
          x="51%"
          y="0%"
          dy={13}
          textAnchor={"middle"}
          fontSize={30}
          fontWeight={500}
          fill="#440073"
          fontFamily={"Graphik-Medium"}
        >
          360&deg;
        </text>
        <text
          x="50%"
          y="5%"
          dy={5}
          textAnchor={"middle"}
          fontSize={18}
          fontWeight={500}
          fill="#440073"
          fontFamily={"Graphik-Medium"}
        >
          Value
        </text>
      </>
    );
  };

  render() {
    const { dimensions, subDimensions, expand, selectedDimension } = this.props;
    const {
      activeIndex,
      dimensionsChart,
      subDimensionsChart,
      subDimensionStartAngle,
      subDimensionEndAngle,
    } = this.state;

    return (
      <ResponsiveContainer
        width="100%"
        height={"100%"}
        id="wheel-chart-container"
        className="svm-dough-nut-chart"
      >
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={dimensionsChart}
            dataKey="value"
            cx="50%"
            cy="0%"
            startAngle={90}
            endAngle={-270}
            innerRadius="27%"
            outerRadius="62%"
            paddingAngle={4}
            onClick={this.onPieEnter}
            label={this.renderCustomizedLabel}
            labelLine={false}
            isAnimationActive={false}
            animationEasing={"ease-out"}
          />

          {/*Dimension Upper Colored Ring*/}
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={dimensions}
            cx="50%"
            cy="0%"
            startAngle={90}
            endAngle={-270}
            innerRadius="64%"
            outerRadius="68%"
            paddingAngle={4}
            isAnimationActive={false}
          />

          {/*Dimension Outer Complete Ring*/}
          {!expand && (
            <Pie
              activeIndex={activeIndex}
              activeShape={this.renderActiveShape}
              data={centre}
              cx="50%"
              cy="0%"
              innerRadius="70%"
              outerRadius="70.2%"
              isAnimationActive={false}
              fill="#7400c0"
              paddingAngle={0}
              labelLine={false}
              stroke=""
            />
          )}

          {/*Sub-dimension Label Ring*/}

          {expand && (
            <Pie
              activeIndex={activeIndex}
              renderActiveShape={{}}
              startAngle={subDimensionStartAngle}
              endAngle={subDimensionEndAngle}
              data={subDimensionsChart}
              // data={subDimensions}
              cx="50%"
              cy="0%"
              innerRadius="70.2%"
              outerRadius="92%"
              paddingAngle={2}
              label={this.renderCustomizedLabel1}
              //   onClick={onSubDimensionCick}
              labelLine={false}
              isAnimationActive={false}
              animationDuration={500}
              animationEasing={"ease-out"}
            />
          )}
          {expand && (
            <Pie
              activeIndex={activeIndex}
              startAngle={subDimensionStartAngle}
              endAngle={subDimensionEndAngle}
              data={subDimensions}
              cx="50%"
              cy="0%"
              innerRadius="93%"
              outerRadius="96%"
              paddingAngle={2}
              isAnimationActive={false}
              animationDuration={500}
              animationEasing={"ease-out"}
            />
          )}
          {/*Sub-dimension Outer Ring*/}
          {expand && (
            <Pie
              activeIndex={activeIndex}
              activeShape={this.renderActiveShape}
              data={subDimensions}
              startAngle={subDimensionStartAngle}
              endAngle={subDimensionEndAngle}
              cx="50%"
              cy="0%"
              innerRadius="98%"
              outerRadius="99%"
              paddingAngle={2}
              isAnimationActive={false}
            />
          )}

          {/* Logo Circle Ring */}
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={dimensions}
            cx="50%"
            cy="0%"
            startAngle={88}
            endAngle={-275}
            innerRadius="25%"
            outerRadius="27%"
            label={this.renderCustomizedLabel2}
            isAnimationActive={false}
            paddingAngle={0}
            labelLine={false}
            stroke=""
          ></Pie>

          {/* Logo Outer Ring */}
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={centre}
            cx="50%"
            cy="0%"
            innerRadius="35%"
            outerRadius="35.2%"
            isAnimationActive={false}
            fill="#7400c0"
            paddingAngle={0}
            labelLine={false}
            stroke=""
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

SVMDoughNutChartV2.defaultProps = {
  title: "SynOps Value Meter",
  selectedDimension: null,
  dimensions: [],
  expand: false,
  expandSubMenu: () => {},
  subDimensions: [],
};
SVMDoughNutChartV2.propTypes = {
  title: PropTypes.string,
  selectedDimension: PropTypes.number,
  expand: PropTypes.bool,
  expandSubMenu: PropTypes.func,
  subDimensions: PropTypes.arrayOf(PropTypes.string),
  dimensions: PropTypes.arrayOf(
    PropTypes.shape({
      dimensionName: PropTypes.string,
      value: PropTypes.number,
      subDimension: PropTypes.arrayOf(PropTypes.string),
      fill: PropTypes.string,
    })
  ),
};

export { SVMDoughNutChartV2 };
