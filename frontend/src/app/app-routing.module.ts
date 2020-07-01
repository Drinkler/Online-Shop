import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {AuthGuard} from "./components/shared/auth.guard";
import {ProductDetailComponent} from "./components/product-detail/product-detail.component";
import {CartDetailComponent} from './components/shopping-cart/cart-detail/cart-detail.component';
import {ProductComponent} from 'src/app/components/product/product.component';
import {SettingsComponent} from 'src/app/components/shared/header/settings/settings.component';
import {ProductResolve} from './components/product/product-resolve';
import {CheckoutComponent} from './components/shopping-cart/checkout/checkout.component';

const routes: Routes = [
  {path: '', redirectTo: '/shop', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'shop', component: ShoppingCartComponent},
  {path: 'product', component: ProductComponent},
  {path: 'cart', component: CartDetailComponent, canActivate: [AuthGuard]},
  {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {
    path: 'shop/product/:id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve
    }
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
