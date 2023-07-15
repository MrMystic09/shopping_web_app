import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatDialogConfig, MatDialog} from '@angular/material/dialog'

import { CartService } from './cart.service';
import { Cart } from 'src/app/models/cart.mocel';
import { AuthService } from '../../authorization/auth.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  subscription: Subscription;
  cartProducts: Cart[] = [];
  cartLength: number;


  constructor(public _cartService: CartService,
    private _authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }


  ngOnInit() {
    const userId = this._authService.getUserId();
    this._cartService.loadCartProducts(userId);
    this.cartProducts = this._cartService.getCartProducts();

    this.subscription = this._cartService.cartProductsChanged
      .subscribe((cartProducts: Cart[]) => {
        this.cartProducts = cartProducts;
        this.cartLength = this.cartProducts.length;
      })

    this.cartLength = this.cartProducts.length;
  }
  toProductList() {
    this.router.navigate(['home']);
  }

  onOpenDialog() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    // dialogConfig.height = '500px';
    dialogConfig.disableClose = false;
    // dialogConfig.data = cart;

    const dialogRef = this.dialog.open(DialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe((data) => {
      // this._cartService.getCartProducts()
    }).unsubscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
