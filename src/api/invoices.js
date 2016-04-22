import { API_PATH, authorizedReq, saveFile } from './helpers';
import request from 'superagent';
import queryString from 'query-string';

export function getInvoices() {
  return authorizedReq(request.get(API_PATH + "/invoices"));
}

export function generateInvoices(params) {
  return saveFile(API_PATH + "/invoices/generate?" + queryString.stringify(params)).catch(console.warn);
}
