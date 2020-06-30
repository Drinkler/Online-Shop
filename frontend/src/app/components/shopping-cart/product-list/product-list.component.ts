import {Component, OnInit} from '@angular/core';
import {ProductService} from 'src/app/services/product.service';
import {Product} from 'src/app/models/product';

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
      console.log(products);
      // if (from != null && to != null) {
      //   products['products'] = products['products'].filter((product) => {
      //     return product.price >= from
      //       && product.price < to;
      //   });`
      // }

      this.productList = products['products'];

      // this.productList.forEach((element) => {
      //   element['product'].image = `/rest/api/products/${element['product']._id}/image`;
      // });

  });
  }
}
