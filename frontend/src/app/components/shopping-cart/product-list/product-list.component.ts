import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/models/product';
import {FiltersComponent} from 'src/app/components/shopping-cart/filters/filters.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  productList: Product[] = [];

  constructor(
    private productService: ProductService,
  ) {
  }

  ngOnInit(): void {
    this.populateProducts();
  }

  populateProducts(from = null, to = null) {
    this.productService.getProducts().subscribe((products) => {

      if (from != null && to != null) {
        products['products'] = products['products'].filter((product) => {
          return product.price >= from
            && product.price < to;
        });
      }

      this.productList = products['products'];

      this.productList.forEach((element) => {
        if (element.image.startsWith('http://backend:8080')) {
          element.image = element.image.slice(19, element.image.length);
        }
      });
    });
  }
}
