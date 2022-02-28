/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductsFacade } from '@fakestore/fakestore-feature-products';
import { CategorySelectorComponent } from './category-selector.component';
import { of } from 'rxjs';
import { Categories } from '@fakestore/data';

describe('CategorySelectorComponent', () => {
  let component: CategorySelectorComponent;
  let fixture: ComponentFixture<CategorySelectorComponent>;
  let productsFacade: ProductsFacade;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CategorySelectorComponent],
      providers: [
        {
          provide: ProductsFacade,
          useValue: {
            setCategory: jest.fn(),
            category$: of('Electronics')
          }
        }
      ]
    })
      .compileComponents();

    productsFacade = TestBed.inject(ProductsFacade);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the selected category', () => {
    const { debugElement } = fixture;
    const label = debugElement.query(By.css('a')).nativeElement;
    expect(label?.textContent.trim()).toEqual('Electronics');
  });

  it('should select a category when one is selected', () => {
    const { debugElement } = fixture;
    const label = debugElement.queryAll(By.css('.dropdown-item'))[2].nativeElement;
    label.click();
    fixture.detectChanges();

    const spy = jest.spyOn(productsFacade, 'setCategory');
    expect(spy).toHaveBeenCalledWith(Categories.JEWELRY);
  });
});
