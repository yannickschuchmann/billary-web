import { API_PATH, authorizedReq } from './helpers';
import request from 'superagent';

export function getClients() {
  return authorizedReq(request.get(API_PATH + "/clients"));
}

export function patchClient(client) {
  return authorizedReq(request
                        .patch(API_PATH + "/clients/" + client.id)
                        .send({client})
                      );
}

export function postClient(client) {
  return authorizedReq(request
                        .post(API_PATH + "/clients")
                        .send({client})
                      );
}

export function deleteClient(clientId) {
  return authorizedReq(request.delete(API_PATH + "/clients/" + clientId));
}
