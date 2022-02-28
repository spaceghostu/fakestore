import { Action } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { initialState, reducer } from './cart.reducer';

import { createCartItem } from '@fakestore/util/testing';


describe('Cart Reducer', () => {

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });

    describe('[Cart] Add To Cart', () => {
        it('should add the product to the store', () => {
            const product = createCartItem(0);
            const action = CartActions.addToCart({ product });
            const result = reducer(initialState, action);
            const expected = { 0: { ...product } };

            expect(result.entities).toMatchObject(expected);
        });
    });

    describe('[Cart] Remove From Cart', () => {
        it('should remove the product from the store', () => {
            const product = createCartItem(0);
            const entities = { 0: { ...product } };
            const state = { ...initialState, entities };
            const id = 0;

            const action = CartActions.removeFromCart({ id });
            const result = reducer(state, action);

            expect(result.entities).toMatchObject({});
        });
    });

    describe('[Cart] Set Cart Item Quantity', () => {
        it('should set the cart items quantity', () => {
            const product = createCartItem(0);
            const entities = { 0: { ...product } };
            const state = { ...initialState, entities };
            const id = product.id as number;
            const quantity = 5;
            const action = CartActions.setCartItemQuantity({ id, quantity });
            const result = reducer(state, action);
            const expected = { ...product, quantity: 5 };

            expect(result.entities[0]).toMatchObject(expected);
        });
    });
});


