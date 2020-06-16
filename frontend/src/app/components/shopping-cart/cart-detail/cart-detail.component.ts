import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../../services/order.service";
import {Product} from "../../../models/product";

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  orderContent: Product[];

  constructor(private order: OrderService) {
  }

  ngOnInit(): void {
  }

}
