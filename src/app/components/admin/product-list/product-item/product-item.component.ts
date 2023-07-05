import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { DataService } from 'src/app/services/data.service';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {

  @Input() product: Product;
  @Input() index: number;

  constructor(
    private _storeService: StoreService,
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onEditProduct() {
    this.router.navigate([this.index, 'edit'], { relativeTo: this.route });

  }
  onDeleteProduct() {
    this._storeService.deleteProduct(this.index);
    this._dataService.storeProducts();
    this.router.navigate(['admin']);
  }
}
