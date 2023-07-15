import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  subscription: Subscription;

  constructor(private _storeService: StoreService) { }

  ngOnInit() {
    this.subscription = this._storeService.productChanged
      .subscribe((products: Product[]) => {
        this.products = products;
      })

    this.products = this._storeService.getProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
