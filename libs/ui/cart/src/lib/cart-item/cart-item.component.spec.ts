import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createCartItem } from '@fakestore/util/testing';
import { CartItemPriceComponent } from '../..';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartItemComponent, CartItemPriceComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    component.item = createCartItem(0);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render the title', () => {
    const title = fixture.debugElement.query(By.css('.card-title'));
    expect(title.nativeElement.textContent.trim()).toBe('name-0');
  });
  it('should render the price', () => {
    const price = fixture.debugElement.query(By.directive(CartItemPriceComponent));
    expect(price).toBeTruthy();
  });
  it('should render the image', () => {
    const image = fixture.debugElement.query(By.css('img'));
    expect(image.nativeElement.src).toBe('https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg');
  });
  it('should remove cart item', () => {
    const removeButton = fixture.debugElement.query(By.css('.btn-danger'));
    const spy = jest.spyOn(component.removeFromCart, 'emit');

    removeButton.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalledWith({ id: 0 });
  });
  it('should update the quantity', () => {
    const quantityInput = fixture.debugElement.query(By.css('.form-control'));
    const spy = jest.spyOn(component.updateQuantity, 'emit');

    quantityInput.triggerEventHandler('change', { target: { value: 2 } });
    expect(spy).toHaveBeenCalledWith({ id: 0, quantity: 2 });
  });
});
