import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartFacade } from '@fakestore/fakestore-feature-cart';

import { PaymentComponent } from './payment.component';
import { of } from 'rxjs';
import { createCartItem } from '@fakestore/util/testing';
import { CheckoutFacade } from '../+state/checkout.facade';
import { createShippingDetails } from '@fakestore/util/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CartItemComponent } from '@fakestore/ui/cart';
import { CartItemPriceComponent } from '@fakestore/ui/cart';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let debugElement: DebugElement;


  const mockCart = [
    createCartItem(0, '', 1, 25),
    createCartItem(1, '', 2, 12.5),
    createCartItem(2, '', 3, 5),
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentComponent, CartItemPriceComponent, CartItemComponent],
      providers: [
        {
          provide: CartFacade,
          useValue: {
            cart$: of(mockCart),
            total$: of(65),
          }
        },
        {
          provide: CheckoutFacade,
          useValue: {
            shippingDetails$: of(createShippingDetails()),
          }
        },
      ]
    })
      .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the cart', () => {
    const cartItems = debugElement.queryAll(By.directive(CartItemComponent));
    expect(cartItems.length).toBe(3);
  });

  it('should calculate and display the cart totals', () => {
    const priceComponents = debugElement.queryAll(By.directive(CartItemPriceComponent));

    const subTotalElement = priceComponents[0].componentInstance;
    const vatElement = priceComponents[1].componentInstance;
    const shippingElement = priceComponents[2].componentInstance;
    const totalElement = priceComponents[3].componentInstance;

    fixture.detectChanges();

    expect(subTotalElement.value).toBe(65);
    expect(vatElement.value).toBe(9.75);
    expect(shippingElement.value).toBe(6.5);
    expect(totalElement.value).toBe(81.25);
  });
});
