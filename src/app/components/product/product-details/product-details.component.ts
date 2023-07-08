import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { FavouritesService } from '../../home/favourites/favourites.service';
import { CartService } from '../../home/cart/cart.service';
import { AuthService } from '../../authorization/auth.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html'
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  id: number;
  constructor(
    private _storeService: StoreService,
    private _favouritesService: FavouritesService,
    private _cartService: CartService,
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.product = this._storeService.getProduct(this.id);
        }
      );
  }
  onAddToCart() {
    const userId = this._authService.getUserId();
    this._cartService.addToCart(this.product, this.id, userId);
  }


  onAddToFavourites() {
    const userId = this._authService.getUserId();
    this._favouritesService.addToFavourites(this.product, this.id, userId);
  }
}
