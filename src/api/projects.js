import { API_PATH, authorizedReq } from './helpers';
import request from 'superagent';

export function getProjects(query) {
  return authorizedReq(request.get(API_PATH + "/projects").query(query));
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
