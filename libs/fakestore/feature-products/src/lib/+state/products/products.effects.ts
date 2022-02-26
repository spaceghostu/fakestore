import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ProductsService } from '../../products.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.loadProducts),
      mergeMap(() =>
        this.productsService.getAll().pipe(
          map((products) => ({
            type: ProductsActions.loadProductsSuccess.type,
            products,
          })),
          catchError((error) =>
            of({
              type: ProductsActions.loadProductsFailure.type,
              error: error.message,
            })
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private productsService: ProductsService
  ) { }
}
