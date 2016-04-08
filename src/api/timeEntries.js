import { API_PATH, authorizedReq } from './helpers';
import request from 'superagent';

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
