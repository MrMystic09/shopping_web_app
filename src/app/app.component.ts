import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { AuthService } from './components/authorization/auth.service';
import { OrderService } from './components/admin/order/order.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'shopping-web-app';
  
constructor(
  private _dataService: DataService, 
  private _authService: AuthService,
  private _orderService: OrderService) {}

  ngOnInit() {
    this._dataService.loadProducts().subscribe();
    this._authService.autoLogin();
    this._dataService.loadOrders().subscribe();
    console.log('Orders - ', this._orderService.orders);
  }
}
