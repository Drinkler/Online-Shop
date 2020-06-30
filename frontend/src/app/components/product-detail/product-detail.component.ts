import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {OrderService} from '../../services/order.service';
import {AlertService} from '../../services/alert.service';
import {ProductService} from '../../services/product.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;

  productId;

  constructor(
    private order: OrderService,
    private alertService: AlertService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {
    this.product = this.activatedRoute.snapshot.data['product'];
    this.product = this.product['product'];
  }

  ngOnInit(): void {
  }

  addToOrder() {
    console.log('addToOrder');
    this.order.addProduct(this.product._id).subscribe(data => {
      this.alertService.success(data['message']);
    }, error => this.alertService.error(error));
  }
}
