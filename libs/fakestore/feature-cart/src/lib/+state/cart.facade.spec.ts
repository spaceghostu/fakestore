import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { CartFacade } from './cart.facade';
import {
    CART_FEATURE_KEY,
    State,
    reducer,
} from './cart.reducer';
import { createCartItem } from '@fakestore/util/testing';

interface TestSchema {
    cart: State;
}

describe('CartFacade', () => {
    let facade: CartFacade;
    let store: Store<TestSchema>;
    describe('used in NgModule', () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(CART_FEATURE_KEY, reducer),
                ],
                providers: [CartFacade],
            })
            class CustomFeatureModule { }

            @NgModule({
                imports: [
                    NxModule.forRoot(),
                    StoreModule.forRoot({}),
                    EffectsModule.forRoot([]),
                    CustomFeatureModule,
                ],
            })
            class RootModule { }
            TestBed.configureTestingModule({ imports: [RootModule] });

            store = TestBed.inject(Store);
            facade = TestBed.inject(CartFacade);
        });

        it('addToCart() should add an item to the cart', async () => {
            let list = await readFirst(facade.cart$);

            expect(list.length).toBe(0);

            facade.addToCart(createCartItem(0));

            list = await readFirst(facade.cart$);

            expect(list.length).toBe(1);
        });

        it('removeFromCart() should add an item to the cart', async () => {
            facade.addToCart(createCartItem(0));
            let list = await readFirst(facade.cart$);

            expect(list.length).toBe(1);

            facade.removeFromCart(0);

            list = await readFirst(facade.cart$);

            expect(list.length).toBe(0);
        });

    });
});
