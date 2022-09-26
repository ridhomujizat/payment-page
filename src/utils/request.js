import axios from "axios";
import config from "../config";

const http = axios.create({
  baseURL: config.baseURL,
  headers: {
    auth: config.basic,
  },
});

http.defaults.headers.common.auth = config.basic;


http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response !== undefined) {
      //   if (error.response.status === 401) {
      //     // token expired action
      //     localStorage.clear();
      //     window.location.replace('/login');
      //   }
    }
    return Promise.reject(error);
  }
);

export default http;
