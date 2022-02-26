
import { IProductEntity } from '@fakestore/data';
import { createProductEntity } from '@fakestore/util/testing';
import {
  productsAdapter,
  ProductsPartialState,
  initialState,
} from './products.reducer';
import * as ProductsSelectors from './products.selectors';

describe('Products Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getEntityId = (entity: IProductEntity) => entity.id;

  let state: ProductsPartialState;

  beforeEach(() => {
    state = {
      products: productsAdapter.setAll(
        [
          createProductEntity(0),
          createProductEntity(1),
          createProductEntity(2),
        ],
        {
          ...initialState,
          selectedId: 2,
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Products Selectors', () => {
    it('getAllProducts() should return the list of Products', () => {
      const results = ProductsSelectors.getAllProducts(state);
      const selId = getEntityId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe(1);
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ProductsSelectors.getSelected(state) as IProductEntity;
      const selId = getEntityId(result);

      expect(selId).toBe(2);
    });

    it('getProductsLoaded() should return the current "loaded" status', () => {
      const result = ProductsSelectors.getProductsLoaded(state);

      expect(result).toBe(true);
    });

    it('getProductsError() should return the current "error" state', () => {
      const result = ProductsSelectors.getProductsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
