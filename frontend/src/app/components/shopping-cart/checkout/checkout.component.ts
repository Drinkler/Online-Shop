import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {AlertService} from '../../../services/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  subtotal: number;
  loading = false;

  constructor(private orderService: OrderService,
              private alertService: AlertService,
              private router: Router) {
    this.subtotal = this.orderService.subtotal;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true;

    this.orderService.removeAllProducts().subscribe(() => {
      this.router.navigateByUrl('/shop');
    }, error => this.alertService.error('Checkout not possible'));
  }

}
