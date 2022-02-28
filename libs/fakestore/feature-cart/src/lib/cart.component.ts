import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { ICartItem } from '@fakestore/data';
import { CartFacade } from './+state/cart.facade';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartComponent implements OnDestroy {
  cart: Array<ICartItem> = [];
  destroyed$ = new Subject();
  subTotal = 0;
  VAT = 0.15;
  subTotalIncludingVAT = 0;
  total = 0;

  constructor(private facade: CartFacade) {
    this.facade.cart$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(cart => {
      if (!cart) return;
      this.cart = cart;
    });
    this.facade.total$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(total => {
      if (!total) return;
      this.subTotal = total;
      this.subTotalIncludingVAT = total * 0.15;
      this.total = this.subTotal + this.subTotalIncludingVAT;
    });
  }


  updateQuantity({ id, quantity }: { id: number, quantity: number; }) {
    if (quantity <= 0) {
      this.facade.removeFromCart(id);
    } else {
      this.facade.setCartItemQuantity(id, quantity);
    }
  }

  removeFromCart({ id }: { id: number; }) {
    this.facade.removeFromCart(id);
  }


  ngOnDestroy() {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }


}
