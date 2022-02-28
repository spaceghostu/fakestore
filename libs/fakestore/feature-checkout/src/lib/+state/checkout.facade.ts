import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as CheckoutActions from './checkout.actions';
import * as CheckoutSelectors from './checkout.selectors';
import { IShippingDetails } from '@fakestore/data';

@Injectable()
export class CheckoutFacade {
    shippingDetails$ = this.store.pipe(select(CheckoutSelectors.getShippingDetails));

    constructor(private readonly store: Store) { }

    setShippingDetails(shippingDetails: IShippingDetails) {
        this.store.dispatch(CheckoutActions.setShippingDetails({ shippingDetails }));
    }
}
