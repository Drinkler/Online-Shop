import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../models/order';
import {HttpClient} from '@angular/common/http';
import {ordersUrl} from '../config/api';
import {Product} from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  currentOrderId: string;
  currentUserId: string;
  public subtotal: number;

  constructor(private http: HttpClient) {
    this.currentOrderId = localStorage.getItem('orderId');
    this.currentUserId = localStorage.getItem('userId');
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ordersUrl);
  }

  public getOrder(): Observable<Product[]> {
    return this.http.get<Product[]>(`${ordersUrl}/${this.currentOrderId}`);
  }

  public createOrder(userId) {
    return this.http.post(`${ordersUrl}/${userId}`, null);
  }

  public addProduct(productId) {
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
