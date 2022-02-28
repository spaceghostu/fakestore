import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';
import { ProductsFacade } from './products.facade';
import { PRODUCTS_FEATURE_KEY, State, reducer } from './products.reducer';
import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { EffectsModule } from '@ngrx/effects';
import * as ProductsActions from './products.actions';
import { createProductEntity } from '@fakestore/util/testing';
interface TestSchema {
    products: State;
}
describe('ProductsFacade', () => {
    let facade: ProductsFacade;
    let store: Store<TestSchema>;

    describe('used in NgModule', () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(PRODUCTS_FEATURE_KEY, reducer),
                ],
                providers: [ProductsFacade],
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
            facade = TestBed.inject(ProductsFacade);
        });

        it('loadProducts() should return empty list with loaded == false', async () => {
            let list = await readFirst(facade.products$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            facade.loadProducts();

            list = await readFirst(facade.products$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);
        });


        it('products$ should return the loaded list; and loaded flag == true', async () => {
            let list = await readFirst(facade.products$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            store.dispatch(
                ProductsActions.loadProductsSuccess({
                    products: [
                        createProductEntity(0),
                        createProductEntity(1),
                    ],
                })
            );

            list = await readFirst(facade.products$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(2);
            expect(isLoaded).toBe(true);
        });
        it('loadProductsFailure() should return an error', async () => {
            let error = await readFirst(facade.error$);
            expect(error).toBe(undefined);

            store.dispatch(
                ProductsActions.loadProductsFailure({
                    error: 'error',
                })
            );

            error = await readFirst(facade.error$);
            expect(error).toBe('error');
        });
        it('should dispatch loadProducts action', () => {
            const dispatchSpy = jest.spyOn(store, 'dispatch');
            facade.loadProducts();
            expect(dispatchSpy).toHaveBeenCalled();
        });
    });
});
