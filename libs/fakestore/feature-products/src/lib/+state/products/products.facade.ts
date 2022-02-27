import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllProducts, getProductsLoaded, getProductsError, getSelected, getSelectedId, getFilter } from './products.selectors';
import { ProductsPartialState } from './products.reducer';
import { loadProducts, queryProducts, selectProduct } from './products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  products$ = this.store.select(getAllProducts);
  selectedId$ = this.store.select(getSelectedId);
  selected$ = this.store.select(getSelected);
  loaded$ = this.store.select(getProductsLoaded);
  error$ = this.store.select(getProductsError);
  filter$ = this.store.select(getFilter);

  constructor(private store: Store<ProductsPartialState>) { }

  loadProducts() {
    this.store.dispatch(loadProducts());
  }
  selectProduct(id: number) {
    this.store.dispatch(selectProduct({ id }));
  }
  queryProducts(query: string) {
    this.store.dispatch(queryProducts({ query }));
  }
}
