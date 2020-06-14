import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavComponent} from './components/shared/nav/nav.component';
import {HeaderComponent} from './components/shared/header/header.component';
import {FooterComponent} from './components/shared/footer/footer.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {FiltersComponent} from './components/shopping-cart/filters/filters.component';
import {ProductListComponent} from './components/shopping-cart/product-list/product-list.component';
import {CartComponent} from './components/shopping-cart/cart/cart.component';
import {CartItemComponent} from './components/shopping-cart/cart/cart-item/cart-item.component';
import {ProductItemComponent} from './components/shopping-cart/product-list/product-item/product-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {AlertComponent} from './components/shared/alert/alert.component';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from 'src/app/components/shared/jwt.interceptor';
import {ErrorInterceptor} from 'src/app/components/shared/error.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    CartComponent,
    CartItemComponent,
    ProductItemComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  entryComponents: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
