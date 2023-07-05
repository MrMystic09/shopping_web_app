import { Component, OnInit } from '@angular/core';


import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {


  products: Product[] = [];


  constructor(private _storeService: StoreService) { }

  ngOnInit() {

  }


}
