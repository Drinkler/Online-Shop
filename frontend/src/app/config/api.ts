import {environment} from "src/environments/environment";

export const baseUrl = environment.production ? 'http://' : 'http://localhost:8080';
export const productsUrl = baseUrl + '/rest/api/products';
export const userUrl = baseUrl + '/rest/api/user';
