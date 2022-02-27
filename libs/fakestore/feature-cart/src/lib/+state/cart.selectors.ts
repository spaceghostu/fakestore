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

export const getCartTotal = createSelector(
    getAllCartItems,
    (items) => {
        if (!items?.length) return 0;
        return items.reduce((total, entity) => +total + (+entity.price * +entity.quantity), 0);
    }
);
