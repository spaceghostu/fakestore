import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { By } from '@angular/platform-browser';
import { ProductCardPriceComponent } from './product-card-price/product-card-price.component';
import { createProductEntity } from '@fakestore/util/testing';
import { ProductCardRatingComponent } from '../..';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ProductCardComponent,
        ProductCardPriceComponent,
        ProductCardRatingComponent,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    component.product = createProductEntity(0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.card-title'));
    expect(title.nativeElement.textContent.trim()).toBe(component.product.title);
  });
  it('should render the description', () => {
    const description = fixture.debugElement.query(By.css('.card-description'));
    expect(description.nativeElement.textContent.trim()).toBe(component.product.description);
  });
  it('should render the price', () => {
    const price = fixture.debugElement.query(By.directive(ProductCardPriceComponent));
    expect(price).toBeTruthy();
  });
  it('should render the rating', () => {
    const rating = fixture.debugElement.query(By.directive(ProductCardRatingComponent));
    expect(rating).toBeTruthy();
  });
  it('should render the image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toBe(component.product.image);
  });
});
