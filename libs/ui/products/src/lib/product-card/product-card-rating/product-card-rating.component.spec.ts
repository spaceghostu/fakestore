import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ProductCardRatingComponent } from './product-card-rating.component';

describe('ProductCardRatingComponent', () => {
  let component: ProductCardRatingComponent;
  let fixture: ComponentFixture<ProductCardRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardRatingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardRatingComponent);
    component = fixture.componentInstance;
    component.rating = 3.5;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render stars', () => {
    const stars = fixture.debugElement.queryAll(By.css('.fa-star'));
    expect(stars.length).toBe(4);
  });
});
