import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

const APIBACKEND = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL_BACKEND,
});

const APIAIOLD = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL_AI_OLD,
});

const APIAINEW = axios.create({
  baseURL: process.env.REACT_APP_SERVER_API_URL_AI_NEW,
});

export { APIBACKEND, APIAIOLD, APIAINEW };
