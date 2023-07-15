import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Order } from "./order.model";
import { map, tap, Subject } from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderChanged = new Subject<Order[]>();
  orders: Order[] = [];

  constructor() { }

    ngOnInit() {
    }

  setOrders(orders: Order[]) {
    this.orders = orders;
    this.orderChanged.next(this.orders.slice());
  }

  getOrders() {
    return this.orders;
  }

}
