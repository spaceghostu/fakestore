import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShippingComponent } from './shipping/shipping.component';
import { PaymentComponent } from './payment/payment.component';
import { CheckoutComponent } from './checkout.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { NgSelectModule } from '@ng-select/ng-select';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { StoreModule } from '@ngrx/store';
import * as fromCheckout from './+state/checkout.reducer';
import { CheckoutFacade } from './+state/checkout.facade';
import { CartItemModule } from '@fakestore/ui/cart';

@NgModule({
  declarations: [ShippingComponent, PaymentComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MdbFormsModule,
    NgSelectModule,
    MdbRippleModule,
    MdbValidationModule,
    CartItemModule,
    StoreModule.forFeature(
      fromCheckout.CHECKOUT_FEATURE_KEY,
      fromCheckout.reducer
    ),
  ],
  providers: [CheckoutFacade],
})
export class CheckoutModule { }
