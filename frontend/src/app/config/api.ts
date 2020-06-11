import {environment} from 'src/environments/environment';

export const baseUrl = environment.production ? 'http://' : 'http://localhost:8080';
export const productsUrl = baseUrl + '/rest/api/products';
export const apiUrl = baseUrl + '/rest/api/';
export const userUrl = '/rest/api/users';
export const loginUrl = userUrl + '/login';
export const registerUrl = userUrl + '/signup';
