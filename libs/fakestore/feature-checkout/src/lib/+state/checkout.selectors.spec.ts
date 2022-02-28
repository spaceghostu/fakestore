import { CheckoutEntity } from './checkout.models';
import {
    checkoutAdapter,
    CheckoutPartialState,
    initialState,
} from './checkout.reducer';
import * as CheckoutSelectors from './checkout.selectors';

describe('Checkout Selectors', () => {
    const ERROR_MSG = 'No Error Available';
    const getCheckoutId = (it: CheckoutEntity) => it.id;
    const createCheckoutEntity = (id: string, name = '') =>
        ({
            id,
            name: name || `name-${id}`,
        } as CheckoutEntity);

    let state: CheckoutPartialState;

    beforeEach(() => {
        state = {
            checkout: checkoutAdapter.setAll(
                [
                    createCheckoutEntity('PRODUCT-AAA'),
                    createCheckoutEntity('PRODUCT-BBB'),
                    createCheckoutEntity('PRODUCT-CCC'),
                ],
                {
                    ...initialState,
                    selectedId: 'PRODUCT-BBB',
                    error: ERROR_MSG,
                    loaded: true,
                }
            ),
        };
    });

    describe('Checkout Selectors', () => {
        it('getAllCheckout() should return the list of Checkout', () => {
            const results = CheckoutSelectors.getAllCheckout(state);
            const selId = getCheckoutId(results[1]);

            expect(results.length).toBe(3);
            expect(selId).toBe('PRODUCT-BBB');
        });

        it('getSelected() should return the selected Entity', () => {
            const result = CheckoutSelectors.getSelected(
                state
            ) as CheckoutEntity;
            const selId = getCheckoutId(result);

            expect(selId).toBe('PRODUCT-BBB');
        });

        it('getCheckoutLoaded() should return the current "loaded" status', () => {
            const result = CheckoutSelectors.getCheckoutLoaded(state);

            expect(result).toBe(true);
        });

        it('getCheckoutError() should return the current "error" state', () => {
            const result = CheckoutSelectors.getCheckoutError(state);

            expect(result).toBe(ERROR_MSG);
        });
    });
});
