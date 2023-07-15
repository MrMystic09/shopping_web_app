import { Component, OnInit} from '@angular/core';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter.header.component.html'
})
export class FilterHeaderComponent implements OnInit {
  sort = 'descending';
  cols: number = 3;
  itemsShowCount = 12;
  searchTerm: string;

  constructor(private _storeService: StoreService) {

  }
  ngOnInit() {

  }
  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this._storeService.sorting(newSort);
  }
  onItemsCountUpdated(newCount: number): void {
    this.itemsShowCount = newCount;
  }
  onColumnsUpdated(colsNum: number) {
    this.cols = colsNum;
    this._storeService.setCols(this.cols);
  }



  searchProducts() {
    this._storeService.serch(this.searchTerm);
  }
}
