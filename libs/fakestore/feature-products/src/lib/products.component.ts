import { Component } from '@angular/core';
import { ProductsFacade } from './+state/products/products.facade';

@Component({
  selector: 'fakestore-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products$ = this.facade.products$;
  loaded$ = this.facade.loaded$;
  error$ = this.facade.error$;

  constructor(private facade: ProductsFacade) {
    facade.loadProducts();
  }

}
