import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './product-card.component';
import { ProductCardPriceComponent } from './product-card-price/product-card-price.component';
import { ProductCardRatingComponent } from './product-card-rating/product-card-rating.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    ProductCardPriceComponent,
    ProductCardRatingComponent,
  ],
  exports: [
    ProductCardComponent,
  ]
})
export class ProductCardModule { }
