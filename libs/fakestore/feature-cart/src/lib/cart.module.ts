import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromCart from './+state/cart.reducer';
import { CartComponent } from './cart.component';
import { CartItemModule } from '@fakestore/ui/cart';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    CartComponent,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromCart.CART_FEATURE_KEY, fromCart.reducer),
    CartItemModule,
    RouterModule,
  ],
})
export class CartModule { }
