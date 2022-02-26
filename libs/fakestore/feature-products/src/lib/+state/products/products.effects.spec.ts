import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ProductsService } from '../../products.service';

import * as ProductsActions from './products.actions';
import { ProductsEffects } from './products.effects';

describe('ProductsEffects', () => {
  let actions$: Observable<Action>;
  let effects: ProductsEffects;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        {
          provide: ProductsService,
          useValue: {
            getAll: jest.fn()
          }
        },
      ],
    });

    effects = TestBed.inject(ProductsEffects);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('loadProducts$', () => {
    it('should dispatch success on receiving product list', () => {
      testScheduler.run(({ cold, hot, expectObservable }) => {
        const productsService = TestBed.get(ProductsService);

        actions$ = hot('-a', { a: ProductsActions.loadProducts() });
        productsService.getAll.mockReturnValue(
          cold('--a|', { a: [] })
        );

        expectObservable(effects.loadProducts$).toBe('---c', {
          c: {
            type: '[Products/API] Load Products Success',
            products: [],
          },
        });
      });
    });
    it('should dispatch error on receiving error', () => {
      testScheduler.run(({ cold, hot, expectObservable }) => {
        const productsService = TestBed.get(ProductsService);
        const errorMessage = 'An error occurred';

        actions$ = hot('-a', { a: ProductsActions.loadProducts() });
        productsService.getAll.mockReturnValue(
          cold('--#|', {}, { message: errorMessage })
        );

        expectObservable(effects.loadProducts$).toBe('---c', {
          c: {
            type: '[Products/API] Load Products Failure',
            error: errorMessage,
          },
        });
      });
    });
  });
});
