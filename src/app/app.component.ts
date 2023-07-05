import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { AuthService } from './components/authorization/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  title = 'shopping-web-app';
  
constructor(
  private _dataService: DataService, 
  private _authService: AuthService) {}

  ngOnInit() {
    this._dataService.loadProducts().subscribe();
    this._authService.autoLogin();
  }
}
