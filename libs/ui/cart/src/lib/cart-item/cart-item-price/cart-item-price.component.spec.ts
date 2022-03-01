import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartItemPriceComponent } from './cart-item-price.component';
import { By } from '@angular/platform-browser';

describe('CartItemPriceComponent', () => {
  let component: CartItemPriceComponent;
  let fixture: ComponentFixture<CartItemPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartItemPriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemPriceComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the price with correct symbol and 2 decimal places', async () => {
    const { debugElement } = fixture;
    const mainValue = debugElement.query(By.css('.main-value')).nativeElement;
    const cents = debugElement.query(By.css('.cents')).nativeElement;
    const symbol = debugElement.query(By.css('.symbol')).nativeElement;
    component.symbol = '$';
    component.value = 25.5;
    fixture.detectChanges();

    expect(mainValue.textContent.trim()).toContain('25');
    expect(cents.textContent.trim()).toContain('50');
    expect(symbol.textContent.trim()).toContain('$');

  });
});
