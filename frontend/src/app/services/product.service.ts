import { Injectable } from '@angular/core';
import { Product } from "src/app/models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // TODO: Fetch products from backend
  products: Product[] = [
    new Product(1, 'Product1', 'Product1 Description', 100),
    new Product(2, 'Product2', 'Product2 Description', 200),
    new Product(3, 'Product3', 'Product3 Description', 300),
    new Product(4, 'Product4', 'Product4 Description', 400),
    new Product(5, 'Product5', 'Product5 Description', 500),
    new Product(6, 'Product6', 'Product6 Description', 600),
    new Product(7, 'Product7', 'Product7 Description', 700),
  ]

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }
}
