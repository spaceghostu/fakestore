import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
    CHECKOUT_FEATURE_KEY,
    State,
} from './checkout.reducer';

export const getCheckoutState =
    createFeatureSelector<State>(CHECKOUT_FEATURE_KEY);

export const getShippingDetails = createSelector(
    getCheckoutState,
    (state: State) => state.shippingDetails
);
