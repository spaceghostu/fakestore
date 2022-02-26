import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'product-card-rating',
  templateUrl: './product-card-rating.component.html',
  styleUrls: ['./product-card-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardRatingComponent {
  floor = 0;
  remainder = 0;
  value = 0;
  @Input()
  set rating(value: number | undefined) {
    if (!value) return;
    this.floor = Math.floor(value);
    this.remainder = (value - this.floor) * 20;
    this.value = value;
  }
  @Input() count?= 0;

  range(size: number) {
    return new Array(size);
  }
}
