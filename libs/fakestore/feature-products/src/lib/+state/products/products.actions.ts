import { createAction, props } from '@ngrx/store';
import { IProductEntity } from '@fakestore/data';

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
