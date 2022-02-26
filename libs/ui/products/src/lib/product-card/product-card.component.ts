import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { IProductEntity } from '@fakestore/data';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {

  MAX_LENGTH = 228;
  showMore = false;

  @Input() product!: IProductEntity;

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  truncate(string: string) {
    if (string.length < this.MAX_LENGTH) return string;
    return string.substring(0, this.MAX_LENGTH) + '...';
  }
}
