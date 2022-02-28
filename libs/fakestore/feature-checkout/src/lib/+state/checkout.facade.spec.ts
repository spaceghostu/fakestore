import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import * as CheckoutActions from './checkout.actions';
import { CheckoutFacade } from './checkout.facade';
import {
    CHECKOUT_FEATURE_KEY,
    State,
    reducer,
} from './checkout.reducer';
import { createShippingDetails, createEmptyShippingDetails } from '@fakestore/util/testing';

interface TestSchema {
    checkout: State;
}

describe('CheckoutFacade', () => {
    let facade: CheckoutFacade;
    let store: Store<TestSchema>;

    describe('used in NgModule', () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(CHECKOUT_FEATURE_KEY, reducer),
                ],
                providers: [CheckoutFacade],
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
            facade = TestBed.inject(CheckoutFacade);
        });

        it('shippingDetails$ should return and set shipping details', async () => {
            const mockShippingDetails = createShippingDetails();
            const emptyShippingDetails = createEmptyShippingDetails();
            let shippingDetails = await readFirst(facade.shippingDetails$);

            expect(shippingDetails).toMatchObject(emptyShippingDetails);

            store.dispatch(
                CheckoutActions.setShippingDetails({
                    shippingDetails: mockShippingDetails
                })
            );

            shippingDetails = await readFirst(facade.shippingDetails$);

            expect(shippingDetails).toMatchObject(mockShippingDetails);
        });
    });
});
