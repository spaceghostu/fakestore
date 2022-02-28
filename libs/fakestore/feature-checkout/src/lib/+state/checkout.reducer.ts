import { createReducer, on, Action } from '@ngrx/store';

import * as CheckoutActions from './checkout.actions';
import { IShippingDetails } from '@fakestore/data';

export const CHECKOUT_FEATURE_KEY = 'checkout';

export interface State {
    shippingDetails: IShippingDetails;
}

export interface CheckoutPartialState {
    readonly [CHECKOUT_FEATURE_KEY]: State;
}

export const initialState: State = {
    shippingDetails: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: {
            apartment: '',
            street: '',
            suburb: '',
            province: '',
            country: '',
            code: '',
        }
    }
};

const checkoutReducer = createReducer(
    initialState,
    on(CheckoutActions.setShippingDetails, (state, { shippingDetails }) => ({
        ...state,
        shippingDetails
    })),
);

export function reducer(state: State | undefined, action: Action) {
    return checkoutReducer(state, action);
}
