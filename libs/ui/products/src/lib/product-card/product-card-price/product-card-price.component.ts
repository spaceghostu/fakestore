import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'product-card-price',
  templateUrl: './product-card-price.component.html',
  styleUrls: ['./product-card-price.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardPriceComponent {
  @Input() symbol = 'R';
  mainValue = '0';
  cents = '00';
  @Input()
  set value(value: number | undefined) {
    if (!value) return;
    if (value.toString().includes('.')) {
      this.mainValue = value?.toString?.().match?.(/[^.]*/)?.[0] || '';
      this.cents = value?.toString?.().match?.(/\.(.*)/)?.[1] || '';
    } else {
      this.mainValue = value.toString();
    }
  }
}
