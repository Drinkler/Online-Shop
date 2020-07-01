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
import {ProductItemComponent} from './components/shopping-cart/product-list/product-item/product-item.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {PageNotFoundComponent} from './components/shared/page-not-found/page-not-found.component';
import {AlertComponent} from './components/shared/alert/alert.component';
import {ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from 'src/app/components/shared/jwt.interceptor';
import {ErrorInterceptor} from 'src/app/components/shared/error.interceptor';
import {ProductDetailComponent} from './components/product-detail/product-detail.component';
import {CartDetailComponent} from './components/shopping-cart/cart-detail/cart-detail.component';
import {ProductComponent} from './components/product/product.component';
import {StarReviewComponent} from './components/star-review/star-review.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SettingsComponent} from './components/shared/header/settings/settings.component';
import {ProductService} from "./services/product.service";
import {ProductResolve} from "./components/product/product-resolve";
import { CheckoutComponent } from './components/shopping-cart/checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    ShoppingCartComponent,
    FiltersComponent,
    ProductListComponent,
    ProductItemComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    AlertComponent,
    ProductDetailComponent,
    CartDetailComponent,
    ProductComponent,
    StarReviewComponent,
    SettingsComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  entryComponents: [],
  providers: [
    ProductService,
    ProductResolve,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
