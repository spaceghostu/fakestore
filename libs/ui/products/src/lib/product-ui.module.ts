import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './product-card/product-card.module';



@NgModule({
  imports: [
    CommonModule,
    ProductCardModule,
  ],
})
export class ProductUIModule { }
