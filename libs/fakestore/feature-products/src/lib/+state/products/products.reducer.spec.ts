import { Action } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { State, initialState, reducer } from './products.reducer';
import { createProductEntity } from './util-create-mock-product';
import { IProductEntity } from '@fakestore/data';

describe('Products Reducer', () => {

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('[Products Page] Load Products', () => {
    const action = ProductsActions.loadProducts();
    const result = reducer(initialState, action);
    it('should set loaded to false', () => {
      expect(result.loaded).toBe(false);
    });
    it('should set error to null', () => {
      expect(result.error).toBe(null);
    });
  });

  describe('[Products/API] Load Products Success', () => {
    const products: Array<IProductEntity> = [
      createProductEntity(0),
      createProductEntity(1),
      createProductEntity(2),
    ];
    const newState: State = {
      ...initialState,
      entities: products.reduce(
        (entityMap, product) => ({
          ...entityMap,
          [product.id]: product
        }),
        {}
      ),
      ids: products.map(user => user.id as number),
      loaded: true
    };
    const action = ProductsActions.loadProductsSuccess({ products });
    const result = reducer(initialState, action);
    it('should add the list of products to store as a entity dictionary', () => {
      expect(result).toEqual(newState);
      expect(result).not.toBe(newState);
    });
    it('should set loaded to true', () => {
      expect(result.loaded).toBe(true);
    });
    it('should ad the list of product ids to ids array', () => {
      expect(result.ids.length).toBe(3);
    });
  });

  describe('[Products/API] Load Products Failure', () => {
    const newState: State = {
      ...initialState,
      loaded: false
    };
    const action = ProductsActions.loadProductsFailure({ error: 'Failed to load products' });
    const result = reducer(initialState, action);
    it('should set the error to the message received', () => {
      expect(result.error).not.toBe(newState.error);
    });
    it('should keep loaded as false', () => {
      expect(result.loaded).toBe(false);
    });
  });
});



