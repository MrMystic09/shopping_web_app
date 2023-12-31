import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { plainToClass } from 'class-transformer';

import { Product } from 'src/app/models/product.model';
import { Cart } from 'src/app/models/cart.mocel';


@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  private favouriteProducts: Cart[] = [
    
  ];
  
  favouriteProductsChanged = new Subject<Cart[]>();
  productQuantity: number = 1;
  
  constructor() { }

  convertProductToFav(product: Product, quantity: number, productId: number, totalProductPrice: number): Cart {
    const favItem: Cart = new Cart(
      product.picture,
      product.name,
      product.shortDescription,
      product.price,
      quantity,
      productId,
      totalProductPrice
    );
    return favItem;
  }
  
  addToFavourites(product: Product, index: number, userId: string): void {
    if (!this.isProductInFavorites(this.convertProductToFav(product, this.productQuantity, index, product.price))) {
      this.favouriteProducts.push(this.convertProductToFav(product, this.productQuantity, index, product.price));
      this.favouriteProductsChanged.next(this.favouriteProducts.slice());
      this.saveFavouritesProducts(userId);
    } else {
    }
  }
  removeFromFavorites(product: Product): void {
    const index = this.favouriteProducts.indexOf(plainToClass(Cart, product));
    if (index !== -1) {
      this.favouriteProducts.splice(index, 1);
      this.favouriteProductsChanged.next(this.favouriteProducts.slice());
    }
  }
  isProductInFavorites(product: Cart): boolean {
    const favItem: Cart = product;
    return this.favouriteProducts.some(item => item.productId === favItem.productId);
  }

  getFavourites(): Cart[] {
    return this.favouriteProducts;
  }

  deleteFavourite(id: number, userId: string) {
    this.favouriteProducts.splice(id, 1);
    this.favouriteProductsChanged.next(this.favouriteProducts.slice());
    this.saveFavouritesProducts(userId);
  }

  saveFavouritesProducts(userId: string) {
    localStorage.setItem(`favouriteProducts_${userId}`, JSON.stringify(this.favouriteProducts));
  }
  loadFavouritesProducts(userId: string) {
    const favouriteProducts = localStorage.getItem(`favouriteProducts_${userId}`);
    if (favouriteProducts) {
      this.favouriteProducts = JSON.parse(favouriteProducts);
    } else {
      this.favouriteProducts = [];
    }
  }
}
