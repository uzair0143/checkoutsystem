import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { PopulatedCartRouteGuard } from "./route-gaurds/populated-cart.route-gaurd";
import { ProductsDataService } from "./services/products.service";
import { ShoppingCartService } from "./services/shopping-cart.service";
import { LocalStorageServie, StorageService } from "./services/storage.service";

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    StoreFrontComponent,
    CheckoutComponent,
    OrderConfirmationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    ProductsDataService,
    PopulatedCartRouteGuard,
    LocalStorageServie,
    { provide: StorageService, useClass: LocalStorageServie },
    {
      deps: [StorageService, ProductsDataService],
      provide: ShoppingCartService,
      useClass: ShoppingCartService
    }
  ]
})
export class AppModule { }
