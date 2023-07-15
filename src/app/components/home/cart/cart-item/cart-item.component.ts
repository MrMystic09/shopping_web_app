import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.mocel';


import { CartService } from '../cart.service';
import { AuthService } from 'src/app/components/authorization/auth.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit {
  @Input() cart: Cart;
  @Input() index: number;

  constructor(private _cartService: CartService,
    private _authService: AuthService) { }

ngOnInit() {
}

addCartItem() {
 this._cartService.addItem(this.cart);
}
removeCartItem() {
  this._cartService.removeItem(this.cart);
}
deleteCartItem() {
  const userId = this._authService.getUserId();
  this._cartService.deleteCartProduct(this.index, userId);
}

}