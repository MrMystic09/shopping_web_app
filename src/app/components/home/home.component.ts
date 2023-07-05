import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';


import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { DataService } from 'src/app/services/data.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  sort: string;
  cols: number = 3;
  products: Product[] = [];
  searchTerm: string = '';
  private subscriptions: Subscription[] = [];


  constructor(
    private _storeService: StoreService,
    private _dataService: DataService,
    public router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.products = this._storeService.getProducts();

    this.subscriptions.push(
      this._storeService.productChanged
        .subscribe((products: Product[]) => {
          this.products = products;
        }),
      this._storeService.sort
        .subscribe(sorting => {
          if (sorting === 'ascending') {
            this.products = this.products.sort((a, b) => a.price - b.price);
          } if (sorting === 'descending') {
            this.products = this.products.sort((a, b) => b.price - a.price);
          } else {
            this.products = this.products;
          }
        }),
      this._storeService.serchValue
        .subscribe(search => {
          if (search) {
            this.products = this._storeService.getProducts().filter(product =>
              product.name.toLowerCase().includes(search.toLowerCase()));
          } else {
            this.products = this._storeService.getProducts();
          }
        })


    );


    

    this._storeService.getCols().subscribe((newCols) => {
      this.cols = newCols;
    })
  }


}


