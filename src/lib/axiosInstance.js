import axios from "axios";
import promise from "promise";
// import { adalConfig, authContext } from '../Config/AdalConfig';

var axiosInstance = axios.create();

axiosInstance.defaults.headers.common[
  "Authorization"
] = `Bearer ${sessionStorage.getItem("adal.idtoken")}`;

axiosInstance.interceptors.request.use(
  function(config) {
    var oldToken = sessionStorage.getItem("adal.idtoken");
    var oldBase64Url = oldToken.split(".")[1];
    var oldBase64 = oldBase64Url.replace("-", "+").replace("_", "/");
    var tokendetails = JSON.parse(window.atob(oldBase64));
    var expiry = tokendetails["exp"];
    var expTime = new Date(expiry * 1000);
    var currentTime = new Date();
    if (currentTime > expTime) {
      window.location.reload();
      // authContext.acquireToken(adalConfig.clientId, (error, token) => {
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
  },
  function(error) {
    return promise.reject(error);
  }
);

export default axiosInstance;
