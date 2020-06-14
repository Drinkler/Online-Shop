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

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(productsUrl);
  }

  public getProduct(id): Observable<Product> {
    return this.http.get<Product>(`${productsUrl}/${id}`);
  }
}
