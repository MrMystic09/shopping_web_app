import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";


import { Order } from "./order.model";
import { OrderService } from "./order.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-order',
    templateUrl: './order.component.html'
  })
  export class OrderComponent implements OnInit {
    order: Order[] = [];
    private subscription: Subscription;

    constructor(
      private _orderService: OrderService,
      private router: Router) {

    }



    ngOnInit() {
      this.order = this._orderService.getOrders();

      this.subscription = this._orderService.orderChanged.subscribe((orders: Order[]) => {
       this.order = orders; 
      })
    }


    back() {
        this.router.navigate(['/admin']);
    }

  }