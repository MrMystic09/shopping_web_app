import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table'
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductBoxComponent } from './components/product/product.box/product.box.component';
import { FilterHeaderComponent } from './components/filter.header/filter.header.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { EditComponent } from './components/admin/edit/edit.component'


import { StoreService } from './services/store.service';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { ProductItemComponent } from './components/admin/product-list/product-item/product-item.component';
import { FavouriteItemComponent } from './components/home/favourites/favourite-item/favourite-item.component';
import { FavouritesComponent } from './components/home/favourites/favourites.component';
import { CartItemComponent } from './components/home/cart/cart-item/cart-item.component';
import { CartComponent } from './components/home/cart/cart.component';
import { MinimalCartItemComponent } from './components/header/minimal-cart-item/minimal-cart-item.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component'




// import { StoreService } from './services/store.service';
// import { ProductModel } from './models/product/product.model';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductBoxComponent,
    FilterHeaderComponent,
    AdminComponent,
    AuthorizationComponent,
    ProductListComponent,
    EditComponent,
    ProductDetailsComponent,
    ProductItemComponent,
    FavouritesComponent,
    FavouriteItemComponent,
    CartComponent,
    CartItemComponent,
    MinimalCartItemComponent,
    LoadingSpinnerComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
