import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CartComponent } from './components/home/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { EditComponent } from './components/admin/edit/edit.component';
import { ProductListComponent } from './components/admin/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product/product-details/product-details.component';
import { FavouritesComponent } from './components/home/favourites/favourites.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { ProductResolverService } from './services/product-resolver.service';
import { AuthGuard } from './components/authorization/auth-guard.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,

    children: [
      {path: 'product/:id', component: ProductDetailsComponent, resolve: [ProductResolverService]}
      
    ]
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
  {
    path: 'admin',
    // canActivate: [AuthGuard],
    component: AdminComponent,

    children: [
      {path: '', component: ProductListComponent},
      {path: 'add', component: EditComponent},
      // {path: ':id', component: EditComponent},
      {path: ':id/edit', component: EditComponent, resolve: [ProductResolverService]}
      
    ]
  },
  {path: 'auth', component: AuthorizationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
