/* eslint-disable */
import React from "react";
import { PieChart, ResponsiveContainer, Pie, Sector, Text } from "recharts";
import PropTypes from "prop-types";

const centre = [{ name: "Centre", value: 1 }];
const RADIAN = Math.PI / 180;
const data01 = [
  { name: "Financial", value: 300, fill: "#B455AA" },
  { name: "Experience", value: 300, fill: "#A055F5" },
  { name: "Sustainability", value: 300, fill: "#595959" },
  { name: "Talent", value: 300, fill: "#460073" },
  { name: "Inclusion & Diversity", value: 300, fill: "#7500C1" },
  { name: "Custom", value: 300, fill: "#A100FF" },
];

export default class SVMDoughNutChartV2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: null,
      startAngle: 60,
      dimensionsChart: [],
      subDimensionsChart: [],
      subDimensionStartAngle: 60,
      subDimensionEndAngle: 120,
      subDimensionEndAngle: 115,
      circle: [{ value: 100 }],
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
    const dimensionsChart =
      this.props.dimensions &&
      this.props.dimensions.map((o, i) => ({
        ...o,
        fill:
          this.props.theme === "1"
            ? "#b5c0ca"
            : o.id % 2 === 0
            ? "#eff2f5"
            : "#e2e2e2",
      }));
    const subDimensionsChart =
      this.props.subDimensions &&
      this.props.subDimensions.map((o, i) => ({
        ...o,
        fill: this.props.theme === "1" ? "#b5c0ca" : "#eff2f5",
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
          fill:
            this.props.theme === "1"
              ? "#b5c0ca"
              : i % 2 === 0
              ? "#eff2f5"
              : "#e2e2e2",
        }));
      this.setState({
        dimensionsChart,
      });
    }

    if (
      this.props.selectedDimension !== prevProps.selectedDimension &&
      (prevProps.expand !== this.props.expand ||
        prevProps.subDimensions !== this.props.subDimensions)
    ) {
      const subDimensionsChart = this.props.subDimensions.map((o, i) => ({
        ...o,
        fill: this.props.theme === "1" ? "#b5c0ca" : "#eff2f5",
      }));
      this.setState({
        subDimensionsChart,
      });

      if (this.props.expand && this.props.selectedDimension) {
        this.setState((state) => ({
          startAngle: state.startAngle - this.props.selectedDimension * 60,
        }));
      } else {
        this.setState({
          startAngle: 60,
        });
      }
    }
  }

  dimensionLabel = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      index,
      outerRadius,
      startAngle,
      endAngle,
      payload,
    } = props;

    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius - 34) * cos;
    const sy = cy + (outerRadius - 34) * sin;
    // const angle = [176, 536, -184, -544, 896].includes(
    //   parseInt(startAngle + endAngle)
    // )
    //   ? 0
    //   : startAngle + endAngle + 8;

    const angle =
      (midAngle > 420 && midAngle < 480) ||
      (midAngle > 240 && midAngle < 300) ||
      (midAngle > 600 && midAngle < 660)
        ? 0
        : startAngle + endAngle + 8;

    return (
      <g
        cursor={
          this.props.dimensions[index] && this.props.dimensions[index].isActive
            ? "pointer"
            : "inherit"
        }
      >
        <Text
          x={sx}
          y={sy}
          textAnchor="middle"
          angle={90 - midAngle}
          fontSize={12}
          fontWeight={500}
          fill="#000000"
          opacity={
            this.props.dimensions[index] && this.props.dimensions[index].opacity
          }
          fontFamily={"Graphik-Medium"}
          width={12}
          onClick={(e) => this.onPieEnter(e, index)}
        >
          {payload.dimensionName}
        </Text>
      </g>
    );
  };

  onPieEnter = (_, index) => {
    this.props.expandSubMenu(index);
  };

  onSubDimensionClick = (o, index) => {
    // this.props.switchSubDimension(index);
    this.props.switchSubDimension(o.index);
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
    ...props
  }) => {
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

    let datalabel =
      this.props.subDimensions.length - 1 >= index
        ? this.props.subDimensions[index].name
        : "";

    return (
      /*SubDimnension*/
      <React.Fragment>
        <Text
          x={sx}
          y={sy}
          angle={90 - midAngle}
          textAnchor="middle"
          verticalAnchor="end"
          fontSize={10}
          fontWeight={400}
          fill="#020000"
          opacity="0.8"
          fontFamily={"Graphik-Medium"}
          width={12}
          onClick={() => this.onSubDimensionClick(null, index)}
        >
          {datalabel}
        </Text>
        <circle
          cx={ax}
          cy={ay + 5}
          r={4}
          fill="#b455aa"
          stroke="none"
          cursor="pointer"
          onClick={() => this.onSubDimensionClick(null, index)}
        />
      </React.Fragment>
      // <>
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
    const { expand } = this.props;
    return (
      <g cursor={expand ? "pointer" : ""}>
        <text
          x="48%"
          y="0%"
          dy={3}
          textAnchor={"middle"}
          fontSize={30}
          fontWeight={500}
          fill={this.props.theme === "1" ? "#ffffff" : "#440073"}
          fontFamily={"Graphik-Medium"}
          onClick={this.onPieEnter}
        >
          360
          <tspan fontSize={16} x="56.5%" y="-2%">
            &deg;
          </tspan>
        </text>
        <text
          x="47.5%"
          y="4%"
          dy={3}
          textAnchor={"middle"}
          fontSize={18}
          fontWeight={500}
          fill={this.props.theme === "1" ? "#ffffff" : "#440073"}
          fontFamily={"Graphik-Medium"}
          onClick={this.onPieEnter}
        >
          value
        </text>
      </g>
    );
  };

  render() {
    const { dimensions, subDimensions, expand, theme } = this.props;
    const {
      activeIndex,
      dimensionsChart,
      subDimensionsChart,
      subDimensionStartAngle,
      subDimensionEndAngle,
      startAngle,
      circle,
    } = this.state;

    return (
      <ResponsiveContainer
        width="100%"
        height="100%"
        id="wheel-chart-container"
        className="svm-dough-nut-chart"
      >
        <PieChart>
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={dimensionsChart}
            dataKey="value"
            cx="48%"
            cy="0%"
            startAngle={536 - startAngle}
            endAngle={0 - startAngle}
            innerRadius="30%"
            outerRadius="78%"
            paddingAngle={4}
            onClick={this.onPieEnter}
            label={this.dimensionLabel}
            labelLine={false}
            isAnimationActive={false}
            animationEasing={"ease-out"}
            stroke=""
          />
          {/*Dimension Upper Colored Ring*/}
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={dimensions}
            cx="48%"
            cy="0%"
            // startAngle={startAngle}
            // endAngle={360 + startAngle}
            startAngle={536 - startAngle}
            endAngle={0 - startAngle}
            innerRadius="82%"
            outerRadius="86%"
            paddingAngle={4}
            isAnimationActive={false}
            stroke=""
          />
          {/*Dimension Outer Complete Ring*/}
          {!expand && (
            <Pie
              activeIndex={activeIndex}
              activeShape={this.renderActiveShape}
              data={centre}
              cx="48%"
              cy="0%"
              innerRadius="90%"
              outerRadius="90.5%"
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
              cx="48%"
              cy="0%"
              innerRadius="90%"
              outerRadius="120%"
              paddingAngle={2}
              label={this.renderCustomizedLabel1}
              onClick={this.onSubDimensionClick}
              labelLine={false}
              isAnimationActive={false}
              animationDuration={1000}
              animationEasing={"ease-out"}
              stroke=""
              cursor="pointer"
            />
          )}
          {expand && (
            <Pie
              activeIndex={activeIndex}
              startAngle={subDimensionStartAngle}
              endAngle={subDimensionEndAngle}
              data={subDimensions}
              cx="48%"
              cy="0%"
              innerRadius="124%"
              outerRadius="127%"
              paddingAngle={2}
              isAnimationActive={false}
              animationDuration={500}
              animationEasing={"ease-out"}
              stroke=""
            />
          )}
          {/*Sub-dimension Outer Ring*/}
          {expand && (
            <Pie
              activeIndex={activeIndex}
              activeShape={this.renderActiveShape}
              data={centre}
              startAngle={subDimensionStartAngle}
              endAngle={subDimensionEndAngle}
              cx="48%"
              cy="0%"
              innerRadius="131%"
              outerRadius="132%"
              paddingAngle={2}
              fill="#7400c0"
              isAnimationActive={false}
              stroke=""
            />
          )}
          {/* Logo Circle Ring */}
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={circle}
            cx="48%"
            cy="0%"
            startAngle={startAngle}
            endAngle={360 + startAngle}
            innerRadius="0%"
            outerRadius="30%"
            label={this.renderCustomizedLabel2}
            fill={"transparent"}
            onClick={(e) => this.onPieEnter(e, null)}
            isAnimationActive={false}
            paddingAngle={0}
            labelLine={false}
            stroke=""
            cursor={expand ? "pointer" : ""}
          ></Pie>
          <Pie
            activeIndex={activeIndex}
            activeShape={this.renderActiveShape}
            data={data01}
            cx="48%"
            cy="0%"
            startAngle={startAngle}
            endAngle={360 + startAngle}
            innerRadius="30%"
            outerRadius="32%"
            label={this.renderCustomizedLabel2}
            onClick={this.onPieEnter}
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
            cx="48%"
            cy="0%"
            innerRadius="45%"
            outerRadius="45.5%"
            isAnimationActive={false}
            fill="#7400c0"
            paddingAngle={0}
            labelLine={false}
            stroke=""
            onClick={this.onPieEnter}
          />
          {/* {expand &&
            (theme === "1" ? (
              <Pie
                activeIndex={activeIndex}
                renderActiveShape={{}}
                startAngle={56}
                endAngle={-240}
                data={centre}
                cx="48%"
                cy="0%"
                innerRadius="32%"
                outerRadius="80%"
                isAnimationActive={false}
                fill="rgb(31, 37, 40,0.6)"
                paddingAngle={0}
                labelLine={false}
                stroke=""
              ></Pie>
            ) : (
              <Pie
                activeIndex={activeIndex}
                renderActiveShape={{}}
                startAngle={56}
                endAngle={-240}
                data={centre}
                cx="48%"
                cy="0%"
                innerRadius="32%"
                outerRadius="80%"
                isAnimationActive={false}
                fill="rgb(255,255,255,0.6)"
                paddingAngle={0}
                labelLine={false}
                stroke=""
              ></Pie>
            ))} */}
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
  switchSubDimension: () => {},
  subDimensions: [],
};
SVMDoughNutChartV2.propTypes = {
  title: PropTypes.string,
  selectedDimension: PropTypes.number,
  expand: PropTypes.bool,
  expandSubMenu: PropTypes.func,
  switchSubDimension: PropTypes.func,
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
