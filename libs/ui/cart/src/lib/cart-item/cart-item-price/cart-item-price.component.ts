import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cart-item-price',
  templateUrl: './cart-item-price.component.html',
  styleUrls: ['./cart-item-price.component.scss']
})
export class CartItemPriceComponent {

  @Input() symbol = 'R';
  mainValue = '0';
  cents = '00';
  _value = 0;
  @Input()
  get value() {
    return this._value;
  }
  set value(value: number | null) {
    if (!value) return;
    this._value = value;
    if (value.toString().includes('.')) {
      this.mainValue = value?.toFixed(2).toString?.().match?.(/[^.]*/)?.[0] || '';
      this.cents = value?.toFixed(2).toString?.().match?.(/\.(.*)/)?.[1] || '';
    } else {
      this.mainValue = value.toString();
    }
  }
}
