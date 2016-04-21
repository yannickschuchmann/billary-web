import { API_PATH, authorizedReq, saveFile } from './helpers';
import request from 'superagent';

export function getInvoices() {
  return authorizedReq(request.get(API_PATH + "/invoices"));
}

export function generateInvoices() {
  return saveFile(API_PATH + "/invoices/generate").catch(console.warn);
}
