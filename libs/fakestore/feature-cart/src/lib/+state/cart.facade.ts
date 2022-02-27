import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CartPartialState } from './cart.reducer';
import { addToCart, removeFromCart, setCartItemQuantity } from './cart.actions';
import { getAllCartItems, getCartItem, getCartTotal, getIds } from './cart.selectors';
import { ICartItem } from '@fakestore/data';

@Injectable({
    providedIn: 'root',
})
export class CartFacade {
    cart$ = this.store.select(getAllCartItems);
    ids$ = this.store.select(getIds);
    total$ = this.store.select(getCartTotal);

    constructor(private store: Store<CartPartialState>) { }

    addToCart(product: ICartItem) {
        this.store.dispatch(addToCart({ product }));
    }

    removeFromCart(id: number) {
        this.store.dispatch(removeFromCart({ id }));
    }

    getCartItem(id: number) {
        return this.store.select(getCartItem(id));
    }

    setCartItemQuantity(id: number, quantity: number) {
        return this.store.dispatch(setCartItemQuantity({ id, quantity }));
    }
}
