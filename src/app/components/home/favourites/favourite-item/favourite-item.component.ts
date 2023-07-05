import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { CartService } from '../../cart/cart.service';
import { FavouritesService } from '../favourites.service';
import { Cart } from 'src/app/models/cart.mocel';

@Component({
  selector: 'app-favourite-item',
  templateUrl: './favourite-item.component.html'
})
export class FavouriteItemComponent implements OnInit {
  @Input() favourite: Cart;
  @Input() index: number;


  constructor(private _storeService: StoreService,
    private _cartService: CartService,
    private _favouritesService: FavouritesService,
    private router: Router,
    private route: ActivatedRoute) { }

ngOnInit() {
}
onAddToCart() {
  this._cartService.addFavToCart(this.favourite);
}

onDeleteFavourite() {
  this._favouritesService.deleteFavourite(this.index);
}
}
