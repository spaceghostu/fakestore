import { createAction, props } from '@ngrx/store';
import { IProduct } from '@fakestore/data';

export const loadProducts = createAction('[Products Page] Load Products');

export const loadProductsSuccess = createAction(
  '[Products/API] Load Products Success',
  props<{ products: IProduct[]; }>()
);

export const loadProductsFailure = createAction(
  '[Products/API] Load Products Failure',
  props<{ error: string; }>()
);
