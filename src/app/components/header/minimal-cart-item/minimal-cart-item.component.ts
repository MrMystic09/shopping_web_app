import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Cart } from 'src/app/models/cart.mocel';
import { CartService } from '../../home/cart/cart.service';


@Component({
  selector: 'app-minimal-cart-item',
  templateUrl: './minimal-cart-item.component.html'
})
export class MinimalCartItemComponent implements OnInit {
  @Input() cart: Cart;
  @Input() index: number;
  // @Input() totalProductPrice: number;
  constructor(private _cartService: CartService,
    private router: Router,
    private route: ActivatedRoute) { }

ngOnInit() {
}

addCartItem() {
 this._cartService.addItem(this.cart);
 console.log('cart item - ', this.cart);
}
removeCartItem() {
  this._cartService.removeItem(this.cart);
}
deleteCartItem() {
  this._cartService.deleteCartProduct(this.index);
}

}
