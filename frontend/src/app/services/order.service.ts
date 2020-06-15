import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {ordersUrl} from "../config/api";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) {
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ordersUrl);
  }

  public getOrder(orderId): Observable<Order> {
    return this.http.get<Order>(`${ordersUrl}/${orderId}`);
  }

  public createOrder(userId) {
    return this.http.post(`${ordersUrl}/${userId}`, {});
  }

  public addProduct(orderId, productId) {
    return this.http.patch(`${ordersUrl}/${orderId}/products/${productId}`, {});
  }

  public deleteOrder(orderId) {
    return this.http.delete(`${ordersUrl}/${orderId}`);
  }

  public removeProduct(orderId, productId) {
    return this.http.delete(`${ordersUrl}/${orderId}/products/${productId}`);
  }

  public removeAllProducts(orderId) {
    return this.http.delete(`${ordersUrl}/${orderId}/products`);
  }
}
