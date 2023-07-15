import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


import { Cart } from 'src/app/models/cart.mocel';
import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartProducts: Cart[] = [];

  cartProductsChanged = new Subject<Cart[]>();
  productQuantity: number = 1;
  cartProductAdd: Cart;
  totalCartPrice: number = 0;

  constructor() { }

  convertProductToCart(product: Product, quantity: number, productId: number, totalProductPrice: number): Cart {
    const cartItem: Cart = new Cart(
      product.picture,
      product.name,
      product.shortDescription,
      product.price,
      quantity,
      productId,
      totalProductPrice
    );

    return cartItem;
  }

  addToCart(product: Product, index: number, userId: string) {
    if (!this.isProductInCart(product, index)) {
      this.cartProducts.push(this.convertProductToCart(product, this.productQuantity, index, product.price));
      this.setTotalPrice();
      this.cartProductsChanged.next(this.cartProducts.slice());
      this.saveCartProducts(userId);
    } else {

    }
  }

  addItem(cart: Cart) {
    cart.quantity += this.productQuantity;
    this.cartProductsChanged.next(this.cartProducts.slice());
    cart.totalProductPrice += cart.price;
    this.setTotalPrice();
  }
  removeItem(cart: Cart) {
    if (cart.quantity >= 2) {
      cart.quantity -= this.productQuantity;
      this.cartProductsChanged.next(this.cartProducts.slice());
      cart.totalProductPrice -= cart.price;
      this.setTotalPrice();
    }

  }


  isProductInCart(product: Product, index: number): boolean {
    const cartItem: Cart = this.convertProductToCart(product, 1, index, product.price);
    return this.cartProducts.some(item => item.productId === cartItem.productId);
  }

  getCartProducts(): Cart[] {
    return this.cartProducts;
  }
  getTotalProductPrice() {
    return;
  }

  setTotalPrice() {
    this.totalCartPrice = 0;
    for (const cartProduct of this.cartProducts) {
      this.totalCartPrice += cartProduct.totalProductPrice;
    }

  }
  getTotalPrice() {
    return Number(this.totalCartPrice);
  }

  deleteCartProduct(id: number, userId: string) {
    this.cartProducts.splice(id, 1);
    this.cartProductsChanged.next(this.cartProducts.slice());
    this.saveCartProducts(userId);
    this.setTotalPrice();
  }


  addFavToCart(product: Cart): void {
    if (!this.isFavProductInCart(product)) {
      this.cartProducts.push(product);
    } else {
    }
  }

  isFavProductInCart(product: Cart): boolean {
    const cartItem: Cart = product;
    return this.cartProducts.some(item => item.productId === cartItem.productId);
  }


  saveCartProducts(userId: string) {
    localStorage.setItem(`cartProducts_${userId}`, JSON.stringify(this.cartProducts));
  }
  loadCartProducts(userId: string) {
    const cartProducts = localStorage.getItem(`cartProducts_${userId}`);
    if (cartProducts) {
      this.cartProducts = JSON.parse(cartProducts);
    } else {
      this.cartProducts = [];
    }
  }
}