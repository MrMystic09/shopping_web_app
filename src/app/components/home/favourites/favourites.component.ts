import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { StoreService } from 'src/app/services/store.service';
import { FavouritesService } from './favourites.service';
import { Cart } from 'src/app/models/cart.mocel';
import { AuthService } from '../../authorization/auth.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html'
})
export class FavouritesComponent implements OnInit {
  cols: number;
  id: number;
  subscription: Subscription;
  favouriteProducts: Cart[] = [];
  favLength: number;

  constructor(private _storeService: StoreService,
              public _favouritesService: FavouritesService,
              private _authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    const userId = this._authService.getUserId();
    this._favouritesService.loadFavouritesProducts(userId);
    this.favouriteProducts = this._favouritesService.getFavourites();

    this.subscription = this._favouritesService.favouriteProductsChanged
      .subscribe(( favouriteProducts: Cart[]) => {
        this.favouriteProducts =  favouriteProducts;
      })

    this._storeService.getCols().subscribe((newCols) => {
      this.cols = newCols;
    })
  }


  toProductList() {
      this.router.navigate(['home']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
