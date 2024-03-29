import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  PRODUCTS_FEATURE_KEY,
  State,
  productsAdapter,
} from './products.reducer';

// Lookup the 'Products' feature state managed by NgRx
export const getProductsState =
  createFeatureSelector<State>(PRODUCTS_FEATURE_KEY);

const { selectAll, selectEntities } = productsAdapter.getSelectors();

export const getProductsLoaded = createSelector(
  getProductsState,
  (state: State) => state.loaded
);

export const getProductsError = createSelector(
  getProductsState,
  (state: State) => state.error
);

export const getFilter = createSelector(
  getProductsState,
  (state: State) => state.filter
);

export const getCategory = createSelector(
  getProductsState,
  (state: State) => state.category
);

export const getAllProducts = createSelector(getProductsState, (state: State) =>
  selectAll(state)
);

export const getProductsEntities = createSelector(
  getProductsState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getProductsState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getProductsEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
