/* eslint-disable */
import React from "react";
import { PieChart, ResponsiveContainer, Pie, Sector } from "recharts";
import WheelInsideLogo from "./images/GlobeSVM-icon.svg";
import PropTypes from "prop-types";

let centre = [{ name: "Centre", value: 1 }];
let newsubdimension = [{ name: "", value: 0, color: "", DimID: "" }];
const RADIAN = Math.PI / 180;

let outerRing = [];
let midRing = [];

export default class SVMDoughNutChartV1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onPieEnter = (_, index) => {
    this.setState({
      activeIndex: index,
    });
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
    if (index == 0 || index == 3) {
      a = 0;
    } else if (index == 1 || index == 4) {
      a = 60;
    } else {
      a = -60;
    }
    return (
      <text
        x={x}
        y={y}
        fill="white"
        scaleToFit={false}
        textAnchor="middle"
        dominantBaseline="central"
        style={{}}
        fontSize={12}
        width={12}
        transform={"rotate(" + a + " " + x + " " + y + ")"}
      >
        {this.props.dimension[index].name}
      </text>
    );
  };

  renderCustomizedLabel1 = ({
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
      /*SubDimnension*/
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="top"
        scaleToFit={true}
        fontSize={9}
        width={12}
        transform={"rotate(" + a + " " + x + " " + y + ")"}
      >
        {newsubdimension[index].name}
      </text>
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

  renderCustomizedLabel2 = () =>
    // cx,
    // cy,
    // midAngle,
    // innerRadius,
    // outerRadius,
    {
      // const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      // const x = cx + radius * Math.cos(-midAngle * RADIAN);
      // const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <React.Fragment>
          <svg
            x="42%"
            y="35%"
            dy={5}
            textAnchor={"middle"}
            width="15%"
            height="15%"
          >
            <image href={WheelInsideLogo} height="100%" width="100%" />
          </svg>
          <text
            x="43%"
            y="51%"
            scaleToFit={true}
            style={{
              color: "rgb(33, 43, 54)",
              fontFamily: "Graphik-Semibold",
              // fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {" "}
            SynOps
          </text>
          <text
            x="40%"
            y="55%"
            scaleToFit={true}
            style={{
              color: "rgb(33, 43, 54)",
              fontFamily: "Graphik-Semibold",
              // fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {" "}
            Value Meter
          </text>
        </React.Fragment>
      );
    };

  render() {
    const { dimension } = this.props;
    const { activeIndex } = this.state;

    return (
      <ResponsiveContainer
        width="125%"
        height={"100%"}
        id="wheel-chart-container"
      >
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={dimension}
            dataKey="value"
            startAngle={116}
            endAngle={-240}
            innerRadius="35%"
            outerRadius="71%"
            paddingAngle={4}
            // onClick={onPieEnter}
            label={this.renderCustomizedLabel}
            labelLine={false}
            isAnimationActive={false}
            animationEasing={"ease-out"}
          />

          {/* <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={outerRing}
            // cx="50%"
            // cy="28%"
            startAngle={56}
            endAngle={-240}
            innerRadius="74%"
            outerRadius="78%"
            paddingAngle={4}
            isAnimationActive={false}
          />

          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={midRing}
            // cx="50%"
            // cy="28%"
            startAngle={116}
            endAngle={60}
            innerRadius="74%"
            outerRadius="78%"
            paddingAngle={1.5}
            isAnimationActive={false}
          /> */}

          {/* RING CENTER LOGO */}
          <Pie
            activeIndex={activeIndex}
            renderActiveShape={{}}
            startAngle={116}
            endAngle={60}
            data={newsubdimension}
            outerRadius="110%"
            innerRadius="81%"
            paddingAngle={2}
            label={this.renderCustomizedLabel1}
            //   onClick={onSubDimensionCick}
            labelLine={false}
            isAnimationActive={false}
            animationDuration={500}
            animationEasing={"ease-out"}
          />

          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={centre}
            innerRadius="29%"
            outerRadius="31%"
            label={this.renderCustomizedLabel2}
            isAnimationActive={false}
            fill={"#ab65b5"}
            paddingAngle={0}
            labelLine={false}
            stroke=""
          ></Pie>
          {/*SubDimension Ring*/}
          {/* <Pie
            activeIndex={activeIndex}
            startAngle={116}
            endAngle={60}
            data={newsubdimension}
            cx="50%"
            cy="28%"
            innerRadius="113%"
            outerRadius="116%"
            paddingAngle={2}
            isAnimationActive={false}
            animationDuration={500}
            animationEasing={"ease-out"}
          /> */}
        </PieChart>
      </ResponsiveContainer>
    );
  }
}

SVMDoughNutChartV1.defaultProps = {
  title: "SynOps Value Meter",
  dimension: [
    { name: "Financial", value: 500 },
    { name: "Experience", value: 300 },
    { name: "Sustainaibility", value: 300 },
    { name: "Talent", value: 200 },
    { name: "Inclusio & Diversity", value: 500 },
    { name: "Custom", value: 500 },
  ],
};
SVMDoughNutChartV1.propTypes = {
  title: PropTypes.string,
};

export { SVMDoughNutChartV1 };
