import { cartAdapter, CartPartialState, initialState } from './cart.reducer';
import * as CartSelectors from './cart.selectors';
import { createCartItem } from '@fakestore/util/testing';

describe('Cart Selectors', () => {
    let state: CartPartialState;

    beforeEach(() => {
        state = {
            cart: cartAdapter.setAll(
                [
                    createCartItem(0, '', 1, 25),
                    createCartItem(1, '', 2, 12.5),
                    createCartItem(2, '', 3, 5),
                ],
                {
                    ...initialState,
                    error: '',
                }
            ),
        };
    });

    describe('Cart Selectors', () => {
        it('getAllCartItems() should return the list of cart items', () => {
            const results = CartSelectors.getAllCartItems(state);
            expect(results.length).toBe(3);
        });
        it('getCartTotal() should calculate and return the total of all cart items', () => {
            const results = CartSelectors.getCartTotal(state);
            expect(results).toBe(65);
        });

    });
});

