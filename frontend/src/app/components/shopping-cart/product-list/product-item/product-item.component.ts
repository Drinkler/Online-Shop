import { Component, OnInit, Input } from '@angular/core';
import {Product} from "src/app/models/product";
import {MessengerService} from "src/app/services/messenger.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;

  constructor(private msg: MessengerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem)
  }

}
