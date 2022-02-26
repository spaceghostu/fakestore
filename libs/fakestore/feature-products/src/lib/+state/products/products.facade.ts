import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getAllProducts, getProductsLoaded, getProductsError } from './products.selectors';
import { ProductsPartialState } from './products.reducer';
import { loadProducts } from './products.actions';

@Injectable({
  providedIn: 'root',
})
export class ProductsFacade {
  products$ = this.store.select(getAllProducts);
  loaded$ = this.store.select(getProductsLoaded);
  error$ = this.store.select(getProductsError);

  constructor(private store: Store<ProductsPartialState>) { }

  loadProducts() {
    this.store.dispatch(loadProducts());
  }
}
