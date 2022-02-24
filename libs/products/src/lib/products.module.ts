import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products/products.reducer';
import { ProductsEffects } from './+state/products/products.effects';
import { ProductsServiceConfig } from './products.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    HttpClientModule,
  ],
})
export class ProductsModule {
  static forRoot(
    config: ProductsServiceConfig
  ): ModuleWithProviders<ProductsModule> {
    return {
      ngModule: ProductsModule,
      providers: [
        {
          provide: ProductsServiceConfig,
          useValue: config,
        },
      ],
    };
  }
}
