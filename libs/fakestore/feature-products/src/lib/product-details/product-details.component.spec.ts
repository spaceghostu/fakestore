import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { CartFacade } from '@fakestore/fakestore-feature-cart';
import { of } from 'rxjs';
import { ProductsFacade } from '../+state/products/products.facade';

import { ProductDetailsComponent } from './product-details.component';
import { createCartItem, createProductEntity } from '@fakestore/util/testing';
import { By } from '@angular/platform-browser';


class MockProductsFacadeBeforeLoaded {
  loaded$ = of(false);
}

class MockProductsFacadeAfterLoaded {
  loaded$ = of(true);
  selected$ = of(createProductEntity(3));
  selectProduct = jest.fn();
}

class MockCartFacadeProductNotInCart {
  ids$ = of([]);
  getCartItem = jest.fn();
  addToCart = jest.fn();
}

class MockCartFacadeProductIsInCart {
  ids$ = of([3]);
  getCartItem = jest.fn().mockReturnValue(of(createCartItem(3)));
  addToCart = jest.fn();
  removeFromCart = jest.fn();
  setCartItemQuantity = jest.fn();
}

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              id: 3
            })
          }
        },
        {
          provide: ProductsFacade,
          useValue: {
            loaded$: of(true),
            selected$: of(createProductEntity(3)),
            selectProduct: jest.fn(),
          }
        },
        {
          provide: CartFacade,
          useValue: {
            getCartItem: jest.fn()
          },
        }
      ]
    });
  });



  describe('before loaded', () => {
    beforeEach(async () => {
      TestBed.overrideProvider(ProductsFacade, { useValue: new MockProductsFacadeBeforeLoaded() });
      await TestBed.compileComponents();
      fixture = TestBed.createComponent(ProductDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render a loader', () => {
      const containerElement = fixture.debugElement;
      const loader = containerElement.query(By.css('.loader'));
      expect(loader).toBeTruthy();
    });
  });

  describe('after loaded', () => {
    describe('product not in cart', () => {

      let cartFacade: CartFacade;
      let productsFacade: ProductsFacade;
      beforeEach(async () => {
        TestBed.overrideProvider(ProductsFacade, { useValue: new MockProductsFacadeAfterLoaded() });
        TestBed.overrideProvider(CartFacade, { useValue: new MockCartFacadeProductNotInCart() });
        await TestBed.compileComponents();
        cartFacade = TestBed.inject(CartFacade);
        productsFacade = TestBed.inject(ProductsFacade);
        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });

      it('should select the product', async () => {
        const spy = jest.spyOn(productsFacade, 'selectProduct');
        expect(spy).toHaveBeenCalledWith(3);
      });
      it('should render the title', () => {
        const containerElement = fixture.debugElement;
        const title = containerElement.query(By.css('.title'));
        expect(title.nativeElement.textContent).toContain('name-3');
      });
      it('should render the description', () => {
        const containerElement = fixture.debugElement;
        const title = containerElement.query(By.css('.description'));
        expect(title.nativeElement.textContent).toContain('description for item-3');
      });
      it('should render the rating', () => {
        const containerElement = fixture.debugElement;
        const rating = containerElement.query(By.css('product-card-rating'));
        expect(rating).toBeTruthy();
      });
      it('should render the price', () => {
        const containerElement = fixture.debugElement;
        const price = containerElement.query(By.css('product-card-price'));
        expect(price).toBeTruthy();
      });
      it('should add to cart', async () => {
        const containerElement = fixture.debugElement;
        const addToCartButton = containerElement.query(By.css('.btn-add'));
        const spy = jest.spyOn(cartFacade, 'addToCart');
        const expected = {
          ...createProductEntity(3),
          quantity: 1,
        };

        addToCartButton.triggerEventHandler('click', null);
        expect(addToCartButton).toBeTruthy();
        expect(spy).toHaveBeenCalledWith(expected);
      });
    });

    describe('product is in cart', () => {
      let cartFacade: CartFacade;
      beforeEach(async () => {
        TestBed.overrideProvider(ProductsFacade, { useValue: new MockProductsFacadeAfterLoaded() });
        TestBed.overrideProvider(CartFacade, { useValue: new MockCartFacadeProductIsInCart() });
        await TestBed.compileComponents();
        cartFacade = TestBed.inject(CartFacade);
        fixture = TestBed.createComponent(ProductDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should remove from cart', async () => {
        const containerElement = fixture.debugElement;
        const removeButton = containerElement.query(By.css('.btn-remove'));
        const spy = jest.spyOn(cartFacade, 'removeFromCart');

        expect(removeButton).toBeTruthy();
        removeButton.triggerEventHandler('click', null);
        expect(spy).toHaveBeenCalledWith(3);
      });

      it('should update the quantity', async () => {
        const containerElement = fixture.debugElement;
        const quantityInput = containerElement.query(By.css('.quantity-input'));
        const spy = jest.spyOn(cartFacade, 'setCartItemQuantity');

        quantityInput.triggerEventHandler('change', { target: { value: 2 } });
        expect(spy).toHaveBeenCalledWith(3, 2);
      });
    });
  });





});
