import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/services/product.service";
import { Product } from "../../../models/product";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.productList = products['products'];

      this.productList.forEach((element) => {
        if (element.image.startsWith('http://backend:8080')) {
          element.image = element.image.slice(19, element.image.length);
        }
      });
    });
  }
}
