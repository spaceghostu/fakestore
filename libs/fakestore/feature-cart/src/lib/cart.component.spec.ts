import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartComponent } from './cart.component';
import { CartFacade } from './+state/cart.facade';
import { of } from 'rxjs';
import { createCartItem } from '@fakestore/util/testing';
import { By } from '@angular/platform-browser';
import { CartItemComponent } from '@fakestore/ui/cart';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartFacade: CartFacade;

  const mockCart = [
    createCartItem(0, '', 1, 25),
    createCartItem(1, '', 2, 12.5),
    createCartItem(2, '', 3, 5),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent, CartItemComponent],
      providers: [
        {
          provide: CartFacade,
          useValue: {
            cart$: of(mockCart),
            total$: of(65),
            setCartItemQuantity: jest.fn(),
            removeFromCart: jest.fn(),
          }
        }
      ]
    })
      .compileComponents();

    cartFacade = TestBed.inject(CartFacade);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the cart', () => {
    expect(component.cart).toMatchObject(mockCart);
  });

  it('should get the total and calculate sub total', () => {
    expect(component.subTotal).toBe(65);
    expect(component.total).toBe(65 * (1 + component.VAT));
  });

  it('should update quantities', () => {
    const spy = jest.spyOn(cartFacade, 'setCartItemQuantity');
    const cartItem = fixture.debugElement.query(By.directive(CartItemComponent)).componentInstance;
    cartItem.updateQuantity.emit({ id: 0, quantity: 2 });
    expect(spy).toHaveBeenCalledWith(0, 2);
  });

  it('should remove items', () => {
    const spy = jest.spyOn(cartFacade, 'removeFromCart');
    const cartItem = fixture.debugElement.query(By.directive(CartItemComponent)).componentInstance;
    cartItem.removeFromCart.emit({ id: 0 });
    expect(spy).toHaveBeenCalledWith(0);
  });

  it('should remove item when quantity is 0', () => {
    const spy = jest.spyOn(cartFacade, 'removeFromCart');
    const cartItem = fixture.debugElement.query(By.directive(CartItemComponent)).componentInstance;
    cartItem.updateQuantity.emit({ id: 0, quantity: 0 });
    expect(spy).toHaveBeenCalledWith(0);
  });
});
