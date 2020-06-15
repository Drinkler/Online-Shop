import {environment} from 'src/environments/environment';

export const baseUrl = environment.production ? 'http://' : 'http://localhost:8080';
export const apiUrl = '/rest/api';
export const userUrl = '/rest/api/users';
export const loginUrl = userUrl + '/login';
export const registerUrl = userUrl + '/signup';
export const productsUrl = apiUrl + '/products';
export const ordersUrl = apiUrl + '/orders';
