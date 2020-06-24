import {Component, OnInit} from '@angular/core';
import {OrderService} from 'src/app/services/order.service';
import {Product} from 'src/app/models/product';
import {AlertService} from 'src/app/services/alert.service';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  orderContent;

  subtotal: number;

  constructor(
    private order: OrderService,
    private alert: AlertService
  ) {
    this.orderContent = new Array(0);
    this.subtotal = 0;
  }

  ngOnInit(): void {
    this.updateOrderContent();
  }

  updateOrderContent() {
    this.order.getOrder().subscribe((order) => {
      this.orderContent = order['products'];
      this.orderContent.forEach((element) => {
        if (element.image.startsWith('http://backend:8080')) {
          element.image = element.image.slice(19, element.image.length);
        }
      });
      this.updateSubtotal();
    });
  }

  updateAmount(source: any) {
    console.log(document.getElementById(`qty-${source._id}`));
  }

  removeProductFromOrder(product: Product) {
    this.order.removeProduct(product._id).subscribe((data) => {
        this.updateOrderContent();
      }, error => {
        this.alert.error(error);
      }
    );
  }

  updateSubtotal() {
    this.orderContent.forEach(product => {
      this.subtotal += product.price;
    });
  }
}
