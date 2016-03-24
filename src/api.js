require('es6-promise').polyfill();
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

const API_PATH = "http://api.localhost:3000/v1";

export function getProjects() {
  return request
          .get(API_PATH + "/projects")
          .use(superagentPromisePlugin)
          .end();

}

export function patchProject(project) {
  return request
          .patch(API_PATH + "/projects/" + project.id)
          .send({project})
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

export function getTimeEntries() {
  return request
          .get(API_PATH + "/time_entries")
          .use(superagentPromisePlugin)
          .end();
}

export function getCurrentTimeEntry() {
  return request
          .get(API_PATH + "/time_entries/current")
          .use(superagentPromisePlugin)
          .end();
}

export function postTimeEntry(entry) {
  return request
          .post(API_PATH + "/time_entries")
          .send({
            time_entry: entry
          })
          .use(superagentPromisePlugin)
          .end();
}

export function patchTimeEntry(entry) {
  return request
          .patch(API_PATH + "/time_entries/" + entry.id)
          .send({
            time_entry: entry
          })
          .use(superagentPromisePlugin)
          .end();
}

export function deleteTimeEntry(entryId) {
  return request
          .delete(API_PATH + "/time_entries/" + entryId)
          .use(superagentPromisePlugin)
          .end();

}

export function stopTimeEntry() {
  return request
          .post(API_PATH + "/time_entries/stop")
          .use(superagentPromisePlugin)
          .end();
}
