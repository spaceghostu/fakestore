import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllProducts, getProductsLoaded, getProductsError, getSelected, getSelectedId, getFilter, getCategory } from './products.selectors';
import { ProductsPartialState } from './products.reducer';
import { loadProducts, queryProducts, selectProduct, setCategory } from './products.actions';
import { Categories } from '@fakestore/data';

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
  category$ = this.store.select(getCategory);

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
  setCategory(category: Categories) {
    this.store.dispatch(setCategory({ category }));
  }
}
