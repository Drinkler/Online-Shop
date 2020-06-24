import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {OrderService} from '../../services/order.service';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;

  constructor(
    private order: OrderService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
    this.product = history.state.data;

    if (this.product.image.startsWith('http://backend:8080')) {
      this.product.image.slice(19, this.product.image.length);
    }
  }

  addToOrder() {
    console.log('addToOrder');
    this.order.addProduct(this.product._id).subscribe(data => {
      this.alertService.success(data['message']);
    }, error => this.alertService.error(error));
  }
}
