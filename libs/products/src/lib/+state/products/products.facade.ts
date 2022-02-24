import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getProductsEntities } from './products.selectors';
import { ProductsPartialState } from './products.reducer';
import { loadProducts } from './products.actions';

@Injectable({
    providedIn: 'root'
})
export class ProductsFacade {
    products$ = this.store.select(getProductsEntities);

    constructor(private store: Store<ProductsPartialState>) { }

    loadProducts() {
        this.store.dispatch(loadProducts());
    }
}