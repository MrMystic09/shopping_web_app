import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Product } from 'src/app/models/product.model';
import { FavouritesService } from '../../home/favourites/favourites.service';
import { CartService } from '../../home/cart/cart.service';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart.mocel';
import { AuthService } from '../../authorization/auth.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product.box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;

  cartProducts:Cart[] = [];

  private subscription: Subscription;

  constructor(private _favouritesService: FavouritesService,
    private _cartService: CartService,
    private _authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.cartProducts = this._cartService.getCartProducts();
    if (this._cartService.getCartProducts().find((product) => product.productId=== this.index)){
    } else{
    }
    this.subscription = this._cartService.cartProductsChanged
    .subscribe(( cartProducts: Cart[]) => {
      this.cartProducts = cartProducts;
    });
  }


onOpenProduct() {
  this.router.navigate(['product', this.index], {relativeTo: this.route});
 }

onAddToCart() {
  const userId = this._authService.getUserId();
  this._cartService.addToCart(this.product, this.index, userId);
}

onAddToFavourites() {
  const userId = this._authService.getUserId();
  this._favouritesService.addToFavourites(this.product, this.index, userId);
}

}
