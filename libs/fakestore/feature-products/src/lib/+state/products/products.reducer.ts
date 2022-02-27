import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { IProductEntity } from '@fakestore/data';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends EntityState<IProductEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  filter: string;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const productsAdapter: EntityAdapter<IProductEntity> =
  createEntityAdapter<IProductEntity>();

export const initialState: State = productsAdapter.getInitialState({
  loaded: false,
  filter: '',
});

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.loadProducts, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ProductsActions.loadProductsSuccess, (state, { products }) =>
    productsAdapter.setAll(products, { ...state, loaded: true })
  ),
  on(ProductsActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(ProductsActions.selectProduct, (state, { id }) => ({
    ...state,
    selectedId: id,
  })),
  on(ProductsActions.queryProducts, (state, { query }) => ({
    ...state,
    filter: query || '',
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return productsReducer(state, action);
}
