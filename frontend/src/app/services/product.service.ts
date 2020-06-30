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

  public saveProduct(product) {
    const formData: FormData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('productImage', product.productImage, product.productImage.name);
    return this.http.post(`${productsUrl}`, formData);
  }

  public updateProduct(productId) {
    // TODO: Add body
    return this.http.patch(`${productsUrl}/${productId}`, {});
  }

  public deleteProduct(productId) {
    return this.http.delete(`${productsUrl}/${productId}`);
  }

  public getImage(productId) {
    return this.http.get(`${productsUrl}/${productId}/image`);
  }
}

