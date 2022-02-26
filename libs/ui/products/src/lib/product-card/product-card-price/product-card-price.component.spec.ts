import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardPriceComponent } from './product-card-price.component';
import { By } from '@angular/platform-browser';

describe('ProductCardPriceComponent', () => {
  let component: ProductCardPriceComponent;
  let fixture: ComponentFixture<ProductCardPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCardPriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardPriceComponent);
    component = fixture.componentInstance;
    component.symbol = 'R';
    component.value = 49.95;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('display the symbol', () => {
    const symbol = fixture.debugElement.query(By.css('.symbol'));
    expect(symbol.nativeElement.textContent).toBe('R');
  });
  it('display the price', () => {
    const mainValue = fixture.debugElement.query(By.css('.main-value'));
    const cents = fixture.debugElement.query(By.css('.cents'));
    expect(mainValue.nativeElement.textContent).toBe('49');
    expect(cents.nativeElement.textContent).toBe('95');
  });
});
