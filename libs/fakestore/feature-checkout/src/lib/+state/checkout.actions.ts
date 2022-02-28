import { createAction, props } from '@ngrx/store';
import { IShippingDetails } from '@fakestore/data';

export const setShippingDetails = createAction(
    '[Checkout] Set Shipping Details',
    props<{ shippingDetails: IShippingDetails; }>()
);
