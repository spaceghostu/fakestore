import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as CartActions from './cart.actions';
import { ICartItem } from '@fakestore/data';

export const CART_FEATURE_KEY = 'cart';

export interface State extends EntityState<ICartItem> {
    error?: string | null;
}

export interface CartPartialState {
    readonly [CART_FEATURE_KEY]: State;
}

export const cartAdapter: EntityAdapter<ICartItem> =
    createEntityAdapter<ICartItem>();

export const initialState: State = cartAdapter.getInitialState({
});

const cartReducer = createReducer(
    initialState,
    on(CartActions.addToCart, (state, { product }) =>
        cartAdapter.addOne(product, state)
    ),
    on(CartActions.removeFromCart, (state, { id }) =>
        cartAdapter.removeOne(id, state)
    ),
    on(CartActions.setCartItemQuantity, (state, { id, quantity }) => {
        const update = { id, changes: { quantity } };
        return cartAdapter.updateOne(update, state);
    }),
);

export function reducer(state: State | undefined, action: Action) {
    return cartReducer(state, action);
}
