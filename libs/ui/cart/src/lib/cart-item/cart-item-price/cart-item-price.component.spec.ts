import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemPriceComponent } from './cart-item-price.component';

describe('CartItemPriceComponent', () => {
  let component: CartItemPriceComponent;
  let fixture: ComponentFixture<CartItemPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
