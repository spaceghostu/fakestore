import { createAction, props } from '@ngrx/store';
import { Categories, IProductEntity } from '@fakestore/data';

export const loadProducts = createAction('[Products Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: IProductEntity[]; }>()
);

export const loadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: string; }>()
);

export const selectProduct = createAction(
  '[Products Page] Select Products',
  props<{ id: number; }>()
);

// This is just a filter because fakestoreapi.com doesn't have search functionality
export const queryProducts = createAction(
  '[Products Page] Query Products',
  props<{ query?: string; }>()
);

export const setCategory = createAction(
  '[Products Page] Set Category',
  props<{ category?: Categories; }>()
);
