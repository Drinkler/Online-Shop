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
  qtyMap;
  subtotal: number;

  constructor(
    private order: OrderService,
    private alert: AlertService
  ) {
    this.orderContent = new Array(0);
    this.subtotal = 0;
    this.qtyMap = [];
  }

  ngOnInit(): void {
    this.updateOrderContent();
  }

  updateOrderContent() {
    this.order.getOrder().subscribe((order) => {
      this.orderContent = order['products'];
      this.orderContent.forEach((element) => {
        if (element.product.image.startsWith('http://backend:8080')) {
          element.product.image = element.product.image.slice(19, element.product.image.length);
        }
      });
      this.updateSubtotal();
      this.computeQty();
    });
  }

  // Sum products --> TODO: BACKEND RESPONSIBILITY
  computeQty() {
    this.orderContent.forEach((element) => {
      if (this.qtyMap) {
        element.quantity += 1;
      } else {
        this.qtyMap[element.product._id] = element.product._id;
      }
    });

    console.log(this.orderContent);
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
