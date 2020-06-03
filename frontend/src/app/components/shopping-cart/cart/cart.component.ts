import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems = [
    {id: 1, productId: 1, productName: 'Item1', qty: 4, price: 100},
    {id: 2, productId: 3, productName: 'Item2', qty: 3, price: 22},
    {id: 3, productId: 2, productName: 'Item3', qty: 2, price: 25},
    {id: 4, productId: 4, productName: 'Item4', qty: 5, price: 257},
  ];

  cartTotal = 0;

  constructor() { }

  ngOnInit(): void {
    this.cartItems.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

}
