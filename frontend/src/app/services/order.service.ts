import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Order} from "../models/order";
import {HttpClient} from "@angular/common/http";
import {ordersUrl} from "../config/api";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrderId: string = "5ee68f20b9759200118bddb9";

  constructor(private http: HttpClient) {
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ordersUrl);
  }

  public getOrder(): Observable<Order> {
    return this.http.get<Order>(`${ordersUrl}/${this.currentOrderId}`);
  }

  public createOrder(userId) {
    return this.http.post(`${ordersUrl}/${userId}`, {});
  }

  public addProduct(productId) {
    console.log(`${ordersUrl}/${this.currentOrderId}/products/${productId}`);
    return this.http.patch(`${ordersUrl}/${this.currentOrderId}/products/${productId}`, null);
  }

  public deleteOrder() {
    return this.http.delete(`${ordersUrl}/${this.currentOrderId}`);
  }

  public removeProduct(productId) {
    return this.http.delete(`${ordersUrl}/${this.currentOrderId}/products/${productId}`);
  }

  public removeAllProducts() {
    return this.http.delete(`${ordersUrl}/${this.currentOrderId}/products`);
  }
}
