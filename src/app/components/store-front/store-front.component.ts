import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { Product } from "app/models/product.model";
import { ShoppingCart } from "app/models/shopping-cart.model";
import { ProductsDataService } from "app/services/products.service";
import { ShoppingCartService } from "app/services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { FormGroup, FormBuilder  } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.scss"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit {
  public products: Observable<Product[]>;
  targetFormForm: FormGroup;
  discountValue: number;
  audiences = [
    {
      "id": "1",
      "discount": 5,
      "name": "Associate"
    },
    {
      "id": "2",
      "discount": 20,
      "name": "Diamand"
    }
  ]
  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService,
                     private fb: FormBuilder) {
  }
  public targetAudiences(discount: number): void{
   this.discountValue = discount;
  }
  public addProductToCart(product: Product): void {
    if(!(this.discountValue == undefined))
    {  let discountedAmount = (product.actualprice / 100 ) * this.discountValue;
      product.price = product.actualprice - discountedAmount;
      this.shoppingCartService.addItem(product, 1);}
    else
    {alert("Please select the target audences")}
  
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.addItem(product, -1);
  }

  public productInCart(product: Product): boolean {
    return Observable.create((obs: Observer<boolean>) => {
      const sub = this.shoppingCartService
                      .get()
                      .subscribe((cart) => {
                        obs.next(cart.items.some((i) => i.productId === product.id));
                        obs.complete();
                      });
      sub.unsubscribe();
    });
  }

  public ngOnInit(): void {
    this.products = this.productsService.all();

  }
}
