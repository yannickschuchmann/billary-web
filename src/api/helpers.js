require('es6-promise').polyfill();
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const config = require('../config/' + process.env.NODE_ENV);

export const API_PATH = config.API_PATH;

export const getAuthCookie = () => {
  const b = localStorage.getItem("authHeaders");
  return b ? JSON.parse(b) : {};
};

export const authorizedReq = (req) => {
  const authHeaders = getAuthCookie();
  return req
          .withCredentials()
          .set('access-token', authHeaders["access-token"])
          .set('expiry', authHeaders["expiry"])
          .set('token-type', authHeaders["token-type"])
          .set('uid', authHeaders["uid"])
          .set('client', authHeaders["client"])
          .use(superagentPromisePlugin)
          .end();
};
