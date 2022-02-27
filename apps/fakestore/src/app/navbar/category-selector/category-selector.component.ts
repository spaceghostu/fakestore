import { Component } from '@angular/core';
import { Categories } from '@fakestore/data';
import { ProductsFacade } from '@fakestore/fakestore-feature-products';

@Component({
  selector: 'fakestore-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent {

  public categories = Categories;
  category$ = this.productsFacade.category$;

  constructor(private productsFacade: ProductsFacade) { }

  handleSelect(category: Categories) {
    this.productsFacade.setCategory(category);
  }

}
