require('es6-promise').polyfill();
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

const API_PATH = "http://localhost:3000";

export function fetchProjects() {
  return request
          .get(API_PATH + "/projects")
          .use(superagentPromisePlugin)
          .end();

}
