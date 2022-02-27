import { Component, OnDestroy } from '@angular/core';
import { IProductEntity } from '@fakestore/data';
import { ProductsFacade } from './+state/products/products.facade';
import { takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'fakestore-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnDestroy {

  products: Array<IProductEntity> = [];
  loaded$ = this.facade.loaded$;
  error$ = this.facade.error$;
  destroyed$ = new Subject();
  filterValue = '';

  constructor(
    private facade: ProductsFacade,
  ) {
    facade.loadProducts();
    this.facade.products$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(products => {
      if (!products) return;
      this.products = products;
    });
    this.facade.filter$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(filter => {
      this.filterValue = filter;
    });
  }

  ngOnDestroy() {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }

}
