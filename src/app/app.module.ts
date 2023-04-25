import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import {RouterModule} from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product.service';
import { SearchSharedService } from './services/search-shared-service';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    UserAccountComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path:'',component:HomeComponent},
      { path:'home',component:HomeComponent},
      { path:'register',component:HeaderComponent},
      { path:'search/:searchTerm', component:ProductsComponent},
      { path: 'product/:category/:id',component: ProductDetailsComponent},
      { path: 'user-account',component:UserAccountComponent}
    ]),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationService,LocalStorageService,ProductService,SearchSharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
