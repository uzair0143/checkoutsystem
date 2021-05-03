import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";

import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { PopulatedCartRouteGuard } from "./route-gaurds/populated-cart.route-gaurd";

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                canActivate: [PopulatedCartRouteGuard],
                component: CheckoutComponent,
                path: "checkout"
            },
         
            {
                component: StoreFrontComponent,
                path: "**"
            }])
    ]
})
export class AppRoutingModule { }
