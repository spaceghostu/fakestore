import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsFacade } from '../+state/products/products.facade';

@Component({
  selector: 'fakestore-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSearchComponent {

  searchForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productsFacade: ProductsFacade,
  ) {
    this.searchForm = this.fb.group({
      searchQuery: ['', [
        Validators.required,
      ]],
    });
    this.searchForm.valueChanges.subscribe(value => {
      // It should clear the filter when the form is emptied
      // since the form cant submit an empty value
      if (!value.searchQuery)
        this.productsFacade.queryProducts('');
    });
  }

  // Since this actually functions like a filter (because fakestoreapi.com
  // doesn't have search functionality). I would normally
  // update the filter on input change event, but I am doing it this
  // way in order have the form validation
  handleSubmit() {
    this.productsFacade.queryProducts(this.searchForm.controls['searchQuery'].value);
  }
}
