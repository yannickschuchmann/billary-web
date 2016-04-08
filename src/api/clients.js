import { API_PATH, authorizedReq } from './helpers';
import request from 'superagent';

export function getClients() {
  return authorizedReq(request.get(API_PATH + "/clients"));
}
