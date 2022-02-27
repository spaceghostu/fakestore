import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { CartItem, ICartItem } from '@fakestore/data';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {

  @Input() item: ICartItem = new CartItem();
  @Output() updateQuantity = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();

  handleRemove() {
    this.removeFromCart.emit({ id: this.item.id });
  }
  handleUpdateQuantity(event: Event) {
    const quantity = parseInt((event.target as HTMLInputElement).value);
    this.updateQuantity.emit({ id: this.item.id, quantity });
  }
}
