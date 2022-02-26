import { ChangeDetectionStrategy } from '@angular/core';
import { Component } from '@angular/core';
import { ProductsFacade } from '@fakestore/fakestore-feature-products';

@Component({
  selector: 'fakestore-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'fakestore';
  products$ = this.productsFacade.products$;
  constructor(private productsFacade: ProductsFacade) {
    productsFacade.loadProducts();
  }
}
