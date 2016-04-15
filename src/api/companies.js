import { API_PATH, authorizedReq } from './helpers';
import request from 'superagent';

export function patchCompany(company) {
  return authorizedReq(request
                        .patch(API_PATH + "/companies/" + company.id)
                        .send({company})
                      );
}
