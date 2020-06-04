import {Injectable} from '@angular/core';
import {Product} from "src/app/models/product";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const apiURL = 'http://localhost:8080/rest/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(apiURL);
  }
}
