import { Component, Input, OnInit } from '@angular/core';

import { CartService } from '../../cart/cart.service';
import { FavouritesService } from '../favourites.service';
import { Cart } from 'src/app/models/cart.mocel';
import { AuthService } from 'src/app/components/authorization/auth.service';

@Component({
  selector: 'app-favourite-item',
  templateUrl: './favourite-item.component.html'
})
export class FavouriteItemComponent implements OnInit {
  @Input() favourite: Cart;
  @Input() index: number;


  constructor(private _cartService: CartService,
    private _favouritesService: FavouritesService,
    private _authService: AuthService) { }

ngOnInit() {
}
onAddToCart() {
  this._cartService.addFavToCart(this.favourite);
}

onDeleteFavourite() {
  const userId = this._authService.getUserId();
  this._favouritesService.deleteFavourite(this.index, userId);
}
}
