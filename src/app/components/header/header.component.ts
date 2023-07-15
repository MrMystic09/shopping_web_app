import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { Cart } from 'src/app/models/cart.mocel';
import { CartService } from '../home/cart/cart.service';
import { FavouritesService } from '../home/favourites/favourites.service';
import { AuthService } from '../authorization/auth.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  searchTerm: string;
  loggedIn = false;
  UserEmail: string;
  isAdmin: boolean = false;
  itemsCount: number = 0;

  cartProducts: Cart[];

  constructor(
    public _cartService: CartService,
    public _favouriteService: FavouritesService,
    public _authService: AuthService,
    private _storeService: StoreService,
    public router: Router) { }

  ngOnInit() {
    this.cartProducts = this._cartService.getCartProducts();
    this._cartService.setTotalPrice();

    this.subscriptions.push(
      this._authService.user.subscribe(user => {
        this.loggedIn = !!user;
        this.UserEmail = user.email;
      }),
      this._cartService.cartProductsChanged
      .subscribe((cartProducts: Cart[]) => {
        this.cartProducts = cartProducts;
      })
    )
  }

  onLogIn() {
    this.router.navigate(['/auth'])
  }
  onLogOut() {

    this._authService.logout();

  }

  searchProducts() {
    this._storeService.serch(this.searchTerm);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
