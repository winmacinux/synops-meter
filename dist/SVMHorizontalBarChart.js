"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SVMHorizontalBarChart = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.number.to-fixed.js");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactChartjs = require("react-chartjs-2");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SVMHorizontalBarChart extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: sessionStorage.getItem("theme")
    };
  }

  render() {
    _reactChartjs.Chart.helpers.extend(_reactChartjs.Chart.elements.Rectangle.prototype, {
      draw() {
        const ctx = this._chart.ctx;
        const vm = this._view;
        let left, right, top, bottom, signX, signY, borderSkipped;
        let borderWidth = vm.borderWidth; // If radius is less than 0 or is large enough to cause drawing errors a max
        // radius is imposed. If cornerRadius is not defined set it to 0.

        let cornerRadius = this._chart.config.options.cornerRadius;

        if (cornerRadius < 0) {
          cornerRadius = 0;
        }

        if (typeof cornerRadius == "undefined") {
          cornerRadius = 0;
        }

        if (!vm.horizontal) {
          // bar
          left = vm.x - vm.width / 2;
          right = vm.x + vm.width / 2;
          top = vm.y;
          bottom = vm.base;
          signX = 1;
          signY = bottom > top ? 1 : -1;
          borderSkipped = vm.borderSkipped || "bottom";
        } else {
          // horizontal bar
          left = vm.base;
          right = vm.x;
          top = vm.y - vm.height / 2;
          bottom = vm.y + vm.height / 2;
          signX = right > left ? 1 : -1;
          signY = 1;
          borderSkipped = vm.borderSkipped || "left";
        } // Canvas doesn't allow us to stroke inside the width so we can
        // adjust the sizes to fit if we're setting a stroke on the line


        if (borderWidth) {
          // borderWidth shold be less than bar width and bar height.
          const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
          borderWidth = borderWidth > barSize ? barSize : borderWidth;
          const halfStroke = borderWidth / 2; // Adjust borderWidth when bar top position is near vm.base(zero).

          const borderLeft = left + (borderSkipped !== "left" ? halfStroke * signX : 0);
          const borderRight = right + (borderSkipped !== "right" ? -halfStroke * signX : 0);
          const borderTop = top + (borderSkipped !== "top" ? halfStroke * signY : 0);
          const borderBottom = bottom + (borderSkipped !== "bottom" ? -halfStroke * signY : 0); // not become a vertical line?

          if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
          } // not become a horizontal line?


          if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = vm.backgroundColor;
        ctx.strokeStyle = vm.borderColor;
        ctx.lineWidth = borderWidth; // Corner points, from bottom-left to bottom-right clockwise
        // | 1 2 |
        // | 0 3 |

        const corners = [[left, bottom], [left, top], [right, top], [right, bottom]]; // Find first (starting) corner with fallback to 'bottom'

        const borders = ["bottom", "left", "top", "right"];
        let startCorner = borders.indexOf(borderSkipped, 0);

        if (startCorner === -1) {
          startCorner = 0;
        }

        function cornerAt(index) {
          return corners[(startCorner + index) % 4];
        } // Draw rectangle from 'startCorner'


        let corner = cornerAt(0);
        ctx.moveTo(corner[0], corner[1]);

        for (let i = 1; i < 4; i++) {
          corner = cornerAt(i);
          let nextCornerId = i + 1;

          if (nextCornerId == 4) {
            nextCornerId = 0;
          }

          const width = corners[2][0] - corners[1][0];
          const height = corners[0][1] - corners[1][1];
          const x = corners[1][0];
          const y = corners[1][1];
          let radius = cornerRadius; // Fix radius being too large

          if (radius > Math.abs(height) / 1.5) {
            radius = Math.floor(Math.abs(height) / 1.5);
          }

          if (radius > Math.abs(width) / 1.5) {
            radius = Math.floor(Math.abs(width) / 1.5);
          }

          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + width - radius, y);
          ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
          ctx.lineTo(x + width, y + height - radius);
          ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
          ctx.lineTo(x + radius, y + height);
          ctx.quadraticCurveTo(x, y + height, x, y + height);
          ctx.lineTo(x, y);
          ctx.quadraticCurveTo(x, y, x + radius, y);
        }

        ctx.fill();

        if (borderWidth) {
          ctx.stroke();
        }
      }

    });

    const {
      dataset,
      labels,
      unit
    } = this.props;
    const state = {
      labels: labels,
      datasets: [{
        backgroundColor: this.state.theme === "1" ? ["rgb(161, 0, 255)", "rgb(133, 215, 255)"] : ["rgb(117, 0, 192)", "rgb(133, 215, 255)"],
        borderColor: this.state.theme === "1" ? ["rgb(161, 0, 255)", "rgb(133, 215, 255)"] : ["rgb(117, 0, 192)", "rgb(133, 215, 255)"],
        borderWidth: 0.1,
        data: dataset,
        datalabels: {
          // formatter: (value) => {
          //   let percentage = `${value + " $"}`;
          //   return percentage;
          // },
          anchor: "end",
          align: "end",
          clamp: "true",
          formatter: function formatter(value) {
            var ranges = [{
              divider: 1e12,
              suffix: "T"
            }, {
              divider: 1e9,
              suffix: "B"
            }, {
              divider: 1e6,
              suffix: "M"
            }, {
              divider: 1e3,
              suffix: "K"
            }];

            function formatNumber(n) {
              for (var i = 0; i < ranges.length; i++) {
                if (n >= ranges[i].divider) {
                  let tempRange = (n / ranges[i].divider).toString().split(".").length >= 2 ? (n / ranges[i].divider).toFixed(1) : n / ranges[i].divider;
                  return tempRange.toString() + ranges[i].suffix;
                }
              }

              return n;
            }

            let res = formatNumber(value) === null ? "" : formatNumber(value) + " ".concat(unit);
            return res;
          },
          color: "rgb(156, 106, 222)",
          font: {
            weight: 500,
            size: 10,
            family: "Graphik-Medium"
          }
        }
      }]
    };
    const id = "bar-chart";
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "svm-bar-chart"
    }, /*#__PURE__*/_react.default.createElement(_reactChartjs.HorizontalBar, {
      height: "120px",
      data: state,
      options: {
        cornerRadius: 20,
        responsive: true,
        layout: {
          padding: {
            top: 10,
            left: -10,
            right: 40,
            bottom: 5
          }
        },
        legend: {
          display: false
        },
        title: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 13,
              maxTicksLimit: 5,
              callback: function callback(value) {
                var ranges = [{
                  divider: 1e12,
                  suffix: "T"
                }, {
                  divider: 1e9,
                  suffix: "B"
                }, {
                  divider: 1e6,
                  suffix: "M"
                }, {
                  divider: 1e3,
                  suffix: "K"
                }];

                function formatNumber(n) {
                  for (var i = 0; i < ranges.length; i++) {
                    if (n >= ranges[i].divider) {
                      let tempRange = (n / ranges[i].divider).toString().split(".").length >= 2 ? (n / ranges[i].divider).toFixed(1) : n / ranges[i].divider;
                      return Math.ceil(tempRange.toString()) + ranges[i].suffix;
                    }
                  }

                  return n;
                }

                return formatNumber(value);
              },
              fontColor: this.state.theme === "1" ? "rgb(181, 192, 202)" : "rgb(0, 0, 0)",
              fontFamily: "Graphik-Regular",
              fontSize: 11,
              fontWeight: 400,
              padding: 10
            },
            gridLines: {
              tickMarkLength: 0,
              lineWidth: 0.5,
              color: "rgb(181, 192, 202)",
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            display: false,
            barThickness: 10,
            gridLines: {
              display: false
            }
          }]
        }
      },
      id: id
    }));
  }

}

exports.SVMHorizontalBarChart = SVMHorizontalBarChart;
SVMHorizontalBarChart.defaultProps = {
  dataset: [],
  labels: [],
  unit: "$"
};
SVMHorizontalBarChart.propTypes = {
  dataset: _propTypes.default.arrayOf(_propTypes.default.number),
  labels: _propTypes.default.arrayOf(_propTypes.default.string),
  unit: _propTypes.default.string
};
var _default = SVMHorizontalBarChart;
exports.default = _default;