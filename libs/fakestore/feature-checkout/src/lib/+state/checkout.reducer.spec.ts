import { createShippingDetails } from '@fakestore/util/testing';
import { Action } from '@ngrx/store';

import * as CheckoutActions from './checkout.actions';
import { State, initialState, reducer } from './checkout.reducer';

describe('Checkout Reducer', () => {
    describe('[Checkout] Set Shipping Details', () => {
        it('should set shipping details', () => {
            const shippingDetails = createShippingDetails();
            const action = CheckoutActions.setShippingDetails({ shippingDetails });

            const result: State = reducer(initialState, action);

            expect(result.shippingDetails).toMatchObject(shippingDetails);
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
