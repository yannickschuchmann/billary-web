require('es6-promise').polyfill();
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

const API_PATH = "http://localhost:3000";

export function getProjects() {
  return request
          .get(API_PATH + "/projects")
          .use(superagentPromisePlugin)
          .end();

}

export function postProject(project) {
  return request
          .post(API_PATH + "/projects")
          .send({project})
          .use(superagentPromisePlugin)
          .end();

}

export function deleteProject(projectId) {
  return request
          .delete(API_PATH + "/projects/" + projectId)
          .use(superagentPromisePlugin)
          .end();

}
