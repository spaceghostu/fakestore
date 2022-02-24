import { Component } from '@angular/core';
import { ProductsFacade } from '@fakestore/products';

@Component({
  selector: 'fakestore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'fakestore';
  products$ = this.productsFacade.products$;
  constructor(private productsFacade: ProductsFacade) {
    productsFacade.loadProducts();
  }

}
