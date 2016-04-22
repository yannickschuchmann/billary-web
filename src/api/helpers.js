require('es6-promise').polyfill();
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');
const config = require('../config/' + process.env.NODE_ENV);

import saveAs from '../businessLogic/FileSaver';

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

export const saveFile = (path) => {
  const authHeaders = getAuthCookie();
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    // xhr.withCredentials = true;
    // xhr.setRequestHeader("access-token", authHeaders["access-token"]);
    // xhr.setRequestHeader("expiry", authHeaders["expiry"]);
    // xhr.setRequestHeader("token-type", authHeaders["token-type"]);
    // xhr.setRequestHeader("uid", authHeaders["uid"]);
    // xhr.setRequestHeader("client", authHeaders["client"]);
    xhr.setRequestHeader("Content-type","application/zip");
    xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:4000");
    xhr.onload = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        const filesCount = parseInt(xhr.getResponseHeader("files"));
        if (filesCount) {
          var blob = new Blob([xhr.response], {type: "octet/stream"});
          var fileName = "invoices.zip";
          saveAs(blob, fileName);
        }
        resolve(filesCount);
      } else {
        reject();
      }
    };
    xhr.onerror = () => reject;
    xhr.responseType = "arraybuffer";
    xhr.send();
  });
}
