import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subject, takeUntil, combineLatest } from 'rxjs';
import { CartFacade } from '@fakestore/fakestore-feature-cart';
import { ICartItem } from '@fakestore/data';
import { CheckoutFacade } from '../+state/checkout.facade';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentComponent implements OnDestroy {

  shippingDetails$ = this.checkoutFacade.shippingDetails$;
  destroyed$ = new Subject();
  cart: ICartItem[] = [];
  subTotal = 0;
  shipping = 0;
  subTotalIncludingVAT = 0;
  total = 0;

  constructor(
    private cartFacade: CartFacade,
    private checkoutFacade: CheckoutFacade,
  ) {
    this.cartFacade.cart$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(cart => {
      if (!cart) return;
      this.cart = cart;
    });
    combineLatest([
      this.cartFacade.total$,
      this.checkoutFacade.shippingDetails$,
    ]).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(([total, shippingDetails]) => {
      if (!total) return;
      this.subTotal = total;
      this.shipping = total * (shippingDetails.address.country === 'South Africa' ? 0.1 : 0.3);
      this.subTotalIncludingVAT = total * 0.15;
      this.total = this.subTotal + this.subTotalIncludingVAT + this.shipping;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }
}
