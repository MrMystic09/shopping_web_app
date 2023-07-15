import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StoreService } from "./store.service";
import { Product } from "../models/product.model";
import { map, tap } from "rxjs";
import { OrderService } from "../components/admin/order/order.service";
import { Order } from "../components/admin/order/order.model";



@Injectable({ providedIn: 'root' })

export class DataService {


    constructor(
        private http: HttpClient,
        private _storeService: StoreService,
        private _orderService: OrderService) { }

    storeProducts() {
        const products = this._storeService.getProducts();
        this.http.put(
            'https://shopping-web-app-37eb9-default-rtdb.europe-west1.firebasedatabase.app/products.json',
            products
        )
            .subscribe(response => {
            });
    }

    loadProducts() {
        return this.http.get<Product[]>(
            'https://shopping-web-app-37eb9-default-rtdb.europe-west1.firebasedatabase.app/products.json'
        )
            .pipe(
                map(products => {
                    return products
                }),
                tap(products => {
                    this._storeService.setProducts(products);
                })
            )
    }


    storeOrder() {
        const orders = this._orderService.getOrders();
        this.http.put(
          'https://shopping-web-app-37eb9-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
          orders
        )
          .subscribe(response => {
          });
      }
    
      loadOrders() {
        return this.http.get<Order[]>(
          'https://shopping-web-app-37eb9-default-rtdb.europe-west1.firebasedatabase.app/orders.json'
        )
        //   .subscribe(orders => {
        //     this._orderService.setOrders(orders);
        //     console.log('load orders - ',orders);
        //   });
        .pipe(
          map(orders => {
            return orders
          }),
          tap(orders => {
            this._orderService.setOrders(orders);
          })
        )
      }
    
}