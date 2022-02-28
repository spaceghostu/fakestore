import { createAction, props } from '@ngrx/store';
import { ICartItem } from '@fakestore/data';

export const addToCart = createAction(
    '[Cart] Add To Cart',
    props<{ product: ICartItem; }>()
);

export const removeFromCart = createAction(
    '[Cart] Remove From Cart',
    props<{ id: number; }>()
);

export const setCartItemQuantity = createAction(
    '[Cart] Set Cart Item Quantity',
    props<{ id: number, quantity: number; }>()
);
