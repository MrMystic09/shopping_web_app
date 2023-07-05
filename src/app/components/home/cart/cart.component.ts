import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { FavouritesService } from '../favourites/favourites.service';
import { CartService } from './cart.service';
import { Cart } from 'src/app/models/cart.mocel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  subscription: Subscription;
  cartProducts: Cart[] = [];
  cartLength: number;

  constructor(private _storeService: StoreService,
              private _favouritesService: FavouritesService,
              public _cartService: CartService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this._cartService.cartProductsChanged
      .subscribe(( cartProducts: Cart[]) => {
        this.cartProducts = cartProducts;
        this.cartLength = this.cartProducts.length;
        console.log('lenth2 - ',this.cartLength);
      })

    this.cartProducts = this._cartService.getCartProducts();
    this.cartLength = this.cartProducts.length;
    console.log(this.cartProducts);
    console.log('lenth - ',this.cartLength);
  }
  toProductList() {
    this.router.navigate(['home']);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
