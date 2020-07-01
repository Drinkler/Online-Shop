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
    this.qtyMap = {};
  }

  ngOnInit(): void {
    this.updateOrderContent();
  }

  updateOrderContent() {
    this.order.getOrder().subscribe((order) => {
      this.orderContent = order['products'];
      this.updateSubtotal();
      this.computeQty();
    });
  }

  // Sum products --> TODO: BACKEND RESPONSIBILITY
  computeQty() {
    const elements = [];
    this.orderContent.forEach((element) => {
      if (element !== this.orderContent.filter(e => e.product._id === element.product._id)[0]) {
        this.orderContent.filter(e => e.product._id === element.product._id)[0].quantity += 1;
        elements.push(element);
      }
    });

    elements.forEach(e => {
      const index = this.orderContent.indexOf(e, 0);
      this.orderContent.splice(index, 1);
    });

    this.order.subtotal = this.subtotal;
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
      this.subtotal += product.product.price;
    });
  }
}
