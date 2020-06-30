import {Component, OnInit, Input} from '@angular/core';
import {Product} from 'src/app/models/product';
import {MessengerService} from 'src/app/services/messenger.service';
import {Router} from '@angular/router';
import {OrderService} from 'src/app/services/order.service';
import {AlertService} from 'src/app/services/alert.service';
import {AccountService} from "../../../../services/account.service";

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  @Input() productItem: Product;

  userId: string;

  constructor(
    private msg: MessengerService,
    private router: Router,
    private orderService: OrderService,
    private alertService: AlertService
  ) {
  }

  ngOnInit(): void {
  }

  handleAddToCart() {
    this.msg.sendMsg(this.productItem);
    this.orderService.addProduct(this.productItem._id).subscribe(data => {
      this.alertService.success(data['message']);
    }, error => this.alertService.error(error));
  }

}
