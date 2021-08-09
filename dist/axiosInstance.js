"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.string.replace.js");

var _axios = _interopRequireDefault(require("axios"));

var _promise = _interopRequireDefault(require("promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { adalConfig, authContext } from '../Config/AdalConfig';
var axiosInstance = _axios.default.create();

axiosInstance.defaults.headers.common["Authorization"] = "Bearer ".concat(sessionStorage.getItem("adal.idtoken"));
axiosInstance.interceptors.request.use(function (config) {
  var oldToken = sessionStorage.getItem("adal.idtoken");
  var oldBase64Url = oldToken.split(".")[1];
  var oldBase64 = oldBase64Url.replace("-", "+").replace("_", "/");
  var tokendetails = JSON.parse(window.atob(oldBase64));
  var expiry = tokendetails["exp"];
  var expTime = new Date(expiry * 1000);
  var currentTime = new Date();

  if (currentTime > expTime) {
    window.location.reload(); // authContext.acquireToken(adalConfig.clientId, (error, token) => {
    //     if (token) {
    //         sessionStorage.setItem("adal.idtoken", token);
    //         var base64Url = token.split('.')[1];
    //         var base64 = base64Url.replace('-', '+').replace('_', '/');
    //         var tokendetails = JSON.parse(window.atob(base64));
    //         var unique_name = tokendetails["unique_name"];
    //         var EnterpriseId = unique_name.split("@")[0];
    //         sessionStorage.setItem("EnterpriseID", EnterpriseId);
    //     }
    // })
  }

  return config;
}, function (error) {
  return _promise.default.reject(error);
});
var _default = axiosInstance;
exports.default = _default;