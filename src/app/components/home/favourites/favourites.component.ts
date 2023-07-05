import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { FavouritesService } from './favourites.service';
import { Cart } from 'src/app/models/cart.mocel';

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
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this._favouritesService.favouriteProductsChanged
      .subscribe(( favouriteProducts: Cart[]) => {
        this.favouriteProducts =  favouriteProducts;
      })

    this.favouriteProducts = this._favouritesService.getFavourites();

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
