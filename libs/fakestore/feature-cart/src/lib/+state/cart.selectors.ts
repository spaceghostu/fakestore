import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CART_FEATURE_KEY, State, cartAdapter } from './cart.reducer';

export const getCartState = createFeatureSelector<State>(CART_FEATURE_KEY);

const { selectAll, selectEntities } = cartAdapter.getSelectors();

export const getAllCartItems = createSelector(getCartState, (state: State) =>
    selectAll(state)
);

export const getCartEntities = createSelector(getCartState, (state: State) =>
    selectEntities(state)
);

export const getIds = createSelector(
    getCartState,
    (state: State) => state.ids
);

export const getCartItem = (id: number) => createSelector(
    getCartEntities,
    (entities) => entities[id]
);
