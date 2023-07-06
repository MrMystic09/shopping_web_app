import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Product } from '../models/product.model';
import { NgIf } from '@angular/common';

const STORE_BASE_URL = 'https://fakestoreapi.com';

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  // private products: Product[] = [
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'Смартфон  SIM + eSIM  екран: 6,1"  OLED  2556x1179  вбудована пам\'ять: 128 ГБ  оперативна пам\'ять: 6 ГБ  процесор: Apple A16 Bionic  ОС: iOS 16  акумулятор: незнімний  камера: 48 (f/1.78, ширококутна) + 12 (f/2.8, 3х кратний телеоб\'єктив)', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'description', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14-Pro/Deep-Purple/Apple-iPhone-14-Pro-Deep-Purple-thumbnail.png', 'test product name 3', 'Short desc 3', 'description', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'description', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'description', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'description', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'description', 150),
  //   new Product('https://cdn.tmobile.com/content/dam/t-mobile/en-p/cell-phones/apple/Apple-iPhone-14/Blue/Apple-iPhone-14-Blue-thumbnail.png', 'test product name', 'Short desc', 'description', 150)
  // ];

  private products: Product[] = [];



  constructor(private httpClient: HttpClient) { }

  sort = new Subject<string>();

  private cols = new Subject<number>();
  productChanged = new Subject<Product[]>();
  serchValue = new Subject<string>();


  ngOnInit() {

  }

  setCols(colsFilter: number) {
    this.cols.next(colsFilter);
  }
  getCols(cols?: number) {

    return this.cols.asObservable();
  }


  setProducts(products: Product[]) {
    this.products = products;
    this.productChanged.next(this.products.slice());
  }
  getProducts() {
    return this.products.slice();
  }

  getProduct(id: number) {
    return this.products[id]
  }



  addProduct(product: Product) {
    this.products.push(product);
    this.productChanged.next(this.products.slice());
  }
  updateProduct(id: number, newProduct: Product) {
    this.products[id] = newProduct;
    this.productChanged.next(this.products.slice());
  }
  deleteProduct(id: number) {
    this.products.splice(id, 1);
    this.productChanged.next(this.products.slice());
  }


  sorting(sort: string) {
    this.sort.next(sort);
  }



  serch(value: string){
    this.serchValue.next(value);
  }
} 