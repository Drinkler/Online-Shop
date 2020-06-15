import {Injectable} from '@angular/core';
import {Product} from 'src/app/models/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {productsUrl} from '../config/api';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  public getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${productsUrl}/${id}`);
  }

  public saveProduct(product: Product) {
    return this.http.post(`${productsUrl}`, product);
  }

  public updateProduct(productId) {
    // TODO: Add body
    return this.http.patch(`${productsUrl}/${productId}`, {});
  }

  public deleteProduct(productId) {
    return this.http.delete(`${productsUrl}/${productId}`);
  }
}

