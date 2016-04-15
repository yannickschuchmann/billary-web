import { API_PATH, authorizedReq } from './helpers';
import request from 'superagent';

export function getUser() {
  return authorizedReq(request.get(API_PATH + "/users/current"));
}
