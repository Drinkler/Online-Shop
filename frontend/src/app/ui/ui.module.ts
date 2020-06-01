import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MDBBootstrapModule} from "angular-bootstrap-md";
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';



@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent, LoginComponent, RegisterComponent, ShoppingcartComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule
  ], exports : [LayoutComponent]
})
export class UiModule {

}
