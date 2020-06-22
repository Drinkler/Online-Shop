import {environment} from 'src/environments/environment';

export const baseUrl = environment.apiUrl;
export const apiUrl = `${baseUrl}/rest/api`;
export const userUrl = `${baseUrl}/rest/api/users`;
export const loginUrl = `${userUrl}/login`;
export const registerUrl = `${userUrl}/signup`;
export const productsUrl = `${apiUrl}/products`;
export const ordersUrl = `${apiUrl}/orders`;
