"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SVMProjectVerticalChart = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.number.to-fixed.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactChartjs = require("react-chartjs-2");

require("chartjs-plugin-datalabels");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import 'chartjs-plugin-annotation';
class SVMProjectVerticalChart extends _react.Component {
  constructor() {
    super();
    this.state = {
      theme: sessionStorage.getItem("theme")
    };
  }

  render() {
    const {
      unit
    } = this.props;

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
          left = vm.x - vm.width / 2;
          right = vm.x + vm.width / 2;
          top = vm.y;
          bottom = vm.base;
          signX = 1;
          signY = bottom > top ? 1 : -1;
          borderSkipped = vm.borderSkipped || "bottom";
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

          if (height < 0) {
            // Negative values in a standard bar chart
            const x_tl = x;
            const x_tr = x + width;
            const y_tl = y + height;
            const y_tr = y + height;
            const x_bl = x;
            const x_br = x + width;
            const y_bl = y;
            const y_br = y; // Draw

            ctx.moveTo(x_bl + radius, y_bl);
            ctx.lineTo(x_br - radius, y_br);
            ctx.quadraticCurveTo(x_br, y_br, x_br, y_br - radius);
            ctx.lineTo(x_tr, y_tr + radius);
            ctx.quadraticCurveTo(x_tr, y_tr, x_tr - radius, y_tr);
            ctx.lineTo(x_tl + radius, y_tl);
            ctx.quadraticCurveTo(x_tl, y_tl, x_tl, y_tl + radius);
            ctx.lineTo(x_bl, y_bl - radius);
            ctx.quadraticCurveTo(x_bl, y_bl, x_bl + radius, y_bl);
          } else {
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
          }
        }

        ctx.fill();

        if (borderWidth) {
          ctx.stroke();
        }
      }

    });

    const state = {
      labels: ["Identified", "Delivered"],
      datasets: [{
        backgroundColor: this.state.theme === "1" ? ["rgb(161, 0, 255)", "rgb(133, 215, 255)"] : ["rgb(117, 0, 192)", "rgb(133, 215, 255)"],
        borderColor: this.state.theme === "1" ? ["rgb(161, 0, 255)", "rgb(133, 215, 255)"] : ["rgb(117, 0, 192)", "rgb(133, 215, 255)"],
        borderWidth: 0.1,
        barPercentage: 0.1,
        data: [...this.props.dataset],
        datalabels: {
          display: true,
          anchor: function anchor(context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            return value < 0 ? "start" : "end";
          },
          align: function align(context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            return value < 0 ? "bottom" : "top";
          },
          clamp: true,
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

            let res = formatNumber(value) === null ? "" : formatNumber(value);
            return res + " ".concat(unit);
          },
          color: "rgb(156, 106, 222)",
          font: {
            weight: 500,
            size: 12,
            family: "Graphik-Medium"
          },
          offset: 0
        }
      }]
    };
    const id = "bar-chart";
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "svm-project-details-chart"
    }, /*#__PURE__*/_react.default.createElement(_reactChartjs.Bar, {
      height: "130px",
      data: state,
      options: {
        cornerRadius: 15,
        responsive: true,
        layout: {
          padding: {
            top: 20,
            left: -20,
            right: 0,
            bottom: 5
          }
        },
        // annotation: {
        //   annotations: [{
        //     type: 'line',
        //     mode: 'horizontal',
        //     scaleID: 'y-axis-0',
        //     value: this.props.dataset[0],
        //     borderColor: 'rgb(181, 192, 202)',
        //     borderWidth: 0.5,
        //   },{
        //     type: 'line',
        //     mode: 'horizontal',
        //     scaleID: 'y-axis-0',
        //     value:this.props.dataset[1],
        //     borderColor: 'rgb(181, 192, 202)',
        //     borderWidth: 0.5,
        //   }],
        // },
        legend: {
          display: false
        },
        title: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        scales: {
          xAxes: [{
            display: true,
            barThickness: 24,
            scaleLabel: {
              display: true
            },
            gridLines: {
              display: this.state.theme === "1" ? true : false,
              drawBorder: true,
              drawOnChartArea: false,
              drawTicks: false,
              color: this.state.theme === "1" ? "rgb(181, 192, 202)" : "rgb(181, 192, 202,0.5)"
            },
            ticks: {
              padding: 15,
              fontColor: this.state.theme === "1" ? "rgb(181, 192, 202)" : "rgb(45, 58, 75)",
              fontSize: 12,
              fontFamily: "Graphik-Medium",
              fontWeight: "500"
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true
            },
            gridLines: {
              display: true,
              color: this.state.theme === "1" ? "rgb(181, 192, 202)" : "rgb(181, 192, 202,0.5)",
              drawBorder: false,
              drawOnChartArea: true,
              drawTicks: false
            },
            ticks: {
              padding: 15,
              fontColor: "rgb(145, 158, 171)",
              fontSize: 12,
              beginAtZero: true,
              maxTicksLimit: 6,
              minTicksLimit: 5,
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
              }
            }
          }]
        }
      },
      id: id
    }));
  }

}

exports.SVMProjectVerticalChart = SVMProjectVerticalChart;
SVMProjectVerticalChart.defaultProps = {
  dataset: [],
  unit: "$"
};
SVMProjectVerticalChart.propTypes = {
  dataset: _propTypes.default.arrayOf(_propTypes.default.string),
  unit: _propTypes.default.string
};
var _default = SVMProjectVerticalChart;
exports.default = _default;