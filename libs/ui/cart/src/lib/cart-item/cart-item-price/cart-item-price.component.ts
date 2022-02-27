import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'cart-item-price',
  templateUrl: './cart-item-price.component.html',
  styleUrls: ['./cart-item-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemPriceComponent {

  @Input() symbol = 'R';
  mainValue = '0';
  cents = '00';
  @Input()
  set value(value: number | null) {
    if (!value) return;
    if (value.toString().includes('.')) {
      this.mainValue = value?.toFixed(2).toString?.().match?.(/[^.]*/)?.[0] || '';
      this.cents = value?.toFixed(2).toString?.().match?.(/\.(.*)/)?.[1] || '';
    } else {
      this.mainValue = value.toString();
    }
  }
}
