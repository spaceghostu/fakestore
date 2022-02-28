import { Action } from '@ngrx/store';

import * as CheckoutActions from './checkout.actions';
import { CheckoutEntity } from './checkout.models';
import { State, initialState, reducer } from './checkout.reducer';

describe('Checkout Reducer', () => {
    const createCheckoutEntity = (id: string, name = ''): CheckoutEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe('valid Checkout actions', () => {
        it('loadCheckoutSuccess should return the list of known Checkout', () => {
            const checkout = [
                createCheckoutEntity('PRODUCT-AAA'),
                createCheckoutEntity('PRODUCT-zzz'),
            ];
            const action = CheckoutActions.loadCheckoutSuccess({ checkout });

            const result: State = reducer(initialState, action);

            expect(result.loaded).toBe(true);
            expect(result.ids.length).toBe(2);
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
