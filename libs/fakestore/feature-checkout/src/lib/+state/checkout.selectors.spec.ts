import {
    CheckoutPartialState,
} from './checkout.reducer';
import * as CheckoutSelectors from './checkout.selectors';
import { createShippingDetails } from '@fakestore/util/testing';

describe('Checkout Selectors', () => {
    let state: CheckoutPartialState;

    const mockShippingDetails = createShippingDetails();

    beforeEach(() => {
        state = {
            checkout: {
                shippingDetails: mockShippingDetails,
            }
        };
    });

    describe('Checkout Selectors', () => {
        it('getShippingDetails() should return the shipping details', () => {
            const result = CheckoutSelectors.getShippingDetails(state);
            expect(result).toBe(mockShippingDetails);
        });
    });
});
