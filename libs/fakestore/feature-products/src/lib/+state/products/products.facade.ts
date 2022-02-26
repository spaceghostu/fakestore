import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllProducts, getProductsLoaded, getProductsError, getSelected, getSelectedId } from './products.selectors';
import { ProductsPartialState } from './products.reducer';
import { loadProducts, selectProduct } from './products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  products$ = this.store.select(getAllProducts);
  selectedId$ = this.store.select(getSelectedId);
  selected$ = this.store.select(getSelected);
  loaded$ = this.store.select(getProductsLoaded);
  error$ = this.store.select(getProductsError);

  constructor(private store: Store<ProductsPartialState>) { }

  loadProducts() {
    this.store.dispatch(loadProducts());
  }
  selectProduct(id: number) {
    this.store.dispatch(selectProduct({ id }));
  }
}
