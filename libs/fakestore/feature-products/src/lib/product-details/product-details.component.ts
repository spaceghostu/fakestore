import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ProductsFacade } from '../+state/products/products.facade';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject, takeUntil } from 'rxjs';
import { IProductEntity } from '@fakestore/data';
import { CartFacade } from '@fakestore/fakestore-feature-cart';

@Component({
  selector: 'fakestore-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnDestroy {
  id!: number;
  isInCart = false;
  product!: IProductEntity;
  quantity?= 0;
  destroyed$ = new Subject();
  loaded = false;

  constructor(
    public route: ActivatedRoute,
    public productsFacade: ProductsFacade,
    public cartFacade: CartFacade,
    public cdr: ChangeDetectorRef,
  ) {
    combineLatest([
      this.route.params,
      this.productsFacade.loaded$,
      this.productsFacade.selected$
    ]).pipe(takeUntil(this.destroyed$))
      .subscribe(([params, loaded, product]) => {
        if (!params) return;
        this.id = +params['id'];
        this.productsFacade.selectProduct(this.id);
        if (!loaded) return this.productsFacade.loadProducts();
        this.loaded = true;

        if (!product || product.id != this.id) return;
        this.product = product;
        this.cdr.detectChanges();

      });
    combineLatest([
      this.cartFacade.ids$,
      this.cartFacade.getCartItem(this.id)
    ]).pipe(takeUntil(this.destroyed$))
      .subscribe(([cartIds, cartItem]) => {
        if (!cartIds) return;
        this.isInCart = cartIds.includes(this.id as never);
        if (!this.isInCart) return;
        this.quantity = cartItem?.quantity;
        this.cdr.detectChanges();
      });

  }

  addToCart() {
    this.cartFacade.addToCart({ ...this.product, quantity: 1 });
  }
  removeFromCart() {
    this.cartFacade.removeFromCart(this.id);
  }
  updateQuantity(event: Event) {
    const quantity = parseInt((event.target as HTMLInputElement).value);
    this.cartFacade.setCartItemQuantity(this.id, quantity);
  }

  ngOnDestroy() {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }


}
