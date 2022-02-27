import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItemComponent } from './cart-item.component';
import { CartItemPriceComponent } from './cart-item-price/cart-item-price.component';



@NgModule({
  declarations: [
    CartItemComponent,
    CartItemPriceComponent
  ],
  exports: [
    CartItemComponent,
    CartItemPriceComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CartItemModule { }
