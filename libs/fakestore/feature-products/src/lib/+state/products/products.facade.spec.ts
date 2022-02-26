import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nrwl/angular/testing';
import { NxModule } from '@nrwl/angular';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createReducer, on, Action } from '@ngrx/store';
import * as ProductsActions from './products.actions';
import { ProductsFacade } from './products.facade';
import {
    productsAdapter,
    ProductsPartialState,
    initialState,
    reducer,
    State,
} from './products.reducer';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { getAllProducts, getProductsLoaded, getProductsError } from './products.selectors';

describe('ProductsFacade', () => {
    let facade: ProductsFacade;
    let store: MockStore;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore({
                    initialState,
                    selectors: [
                        {
                            selector: getAllProducts,
                            value: [],
                        },
                        {
                            selector: getProductsLoaded,
                            value: true,
                        },
                        {
                            selector: getProductsError,
                            value: null,
                        },
                    ],
                }),
                ProductsFacade
            ]
        });

        store = TestBed.inject(MockStore);
        facade = TestBed.get(ProductsFacade);
    });

    afterEach(() => {
        store?.resetSelectors();
    });

    it('should return empty product list', async () => {
        const list = await readFirst(facade.products$);
        await expect(list.length).toBe(0);
    });
    it('should return loaded == true', async () => {
        const isLoaded = await readFirst(facade.loaded$);
        await expect(isLoaded).toBe(true);
    });
    it('should return an error as null', async () => {
        const error = await readFirst(facade.error$);
        await expect(error).toBe(null);
    });
    it('should dispatch loadProducts action', () => {
        const dispatchSpy = jest.spyOn(store, 'dispatch');
        facade.loadProducts();
        expect(dispatchSpy).toHaveBeenCalled();
    });
});