import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCart from './+state/cart.reducer';
import { CartEffects } from './+state/cart.effects';
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
    EffectsModule.forFeature([CartEffects]),
    CartItemModule,
    RouterModule,
  ],
})
export class CartModule { }
