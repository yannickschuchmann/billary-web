require('es6-promise').polyfill();
const request = require('superagent');
const superagentPromisePlugin = require('superagent-promise-plugin');

export const API_PATH = "http://api.localhost:3000/v1";


const getAuthCookie = () => {
  const b = localStorage.getItem("authHeaders");
  return b ? JSON.parse(b) : {};
};

const authorizedReq = (req) => {
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

export function getProjects() {
  return authorizedReq(request.get(API_PATH + "/projects"));
}

export function patchProject(project) {
  return authorizedReq(request
                        .patch(API_PATH + "/projects/" + project.id)
                        .send({project})
                      );
}

export function postProject(project) {
  return authorizedReq(request
                        .post(API_PATH + "/projects")
                        .send({project})
                      );
}

export function deleteProject(projectId) {
  return authorizedReq(request.delete(API_PATH + "/projects/" + projectId));
}

export function getTimeEntries() {
  return authorizedReq(request.get(API_PATH + "/time_entries"));
}

export function getCurrentTimeEntry() {
  return authorizedReq(request.get(API_PATH + "/time_entries/current"));
}

export function postTimeEntry(entry) {
  return authorizedReq(request
                        .post(API_PATH + "/time_entries")
                        .send({
                          time_entry: entry
                        })
                      );
}

export function patchTimeEntry(entry) {
  return authorizedReq(request
                        .patch(API_PATH + "/time_entries/" + entry.id)
                        .send({
                          time_entry: entry
                        })
                      );
}

export function deleteTimeEntry(entryId) {
  return authorizedReq(request.delete(API_PATH + "/time_entries/" + entryId));
}

export function stopTimeEntry() {
  return authorizedReq(request.post(API_PATH + "/time_entries/stop"));
}
