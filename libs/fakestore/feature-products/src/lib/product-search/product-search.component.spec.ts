import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSearchComponent } from './product-search.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductsFacade } from '../+state/products/products.facade';
import { By } from '@angular/platform-browser';
import { queryProducts } from '../+state/products/products.actions';

describe('ProductSearchComponent', () => {
  let component: ProductSearchComponent;
  let fixture: ComponentFixture<ProductSearchComponent>;
  let productsFacade: ProductsFacade;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductSearchComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ProductsFacade,
          useValue: {
            queryProducts: jest.fn()
          }
        },
        FormBuilder
      ]
    })
      .compileComponents();
    productsFacade = TestBed.inject(ProductsFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update filter value', () => {
    const { debugElement } = fixture;
    const form = debugElement.query(By.css('form'));
    const spy = jest.spyOn(productsFacade, 'queryProducts');
    component.searchForm.controls['searchQuery'].setValue('query');
    form.triggerEventHandler('ngSubmit', null);
    expect(spy).toHaveBeenCalledWith('query');
  });
});
