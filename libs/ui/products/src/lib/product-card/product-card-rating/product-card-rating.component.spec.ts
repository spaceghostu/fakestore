import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardRatingComponent } from './product-card-rating.component';

describe('ProductCardRatingComponent', () => {
  let component: ProductCardRatingComponent;
  let fixture: ComponentFixture<ProductCardRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
