import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromProducts from './+state/products/products.reducer';
import { ProductsEffects } from './+state/products/products.effects';
import { ProductsServiceConfig } from './products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products.component';
import { ProductCardModule } from '@fakestore/ui/products';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RouterModule } from '@angular/router';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { UtilSharedModule } from '@fakestore/util/shared';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromProducts.PRODUCTS_FEATURE_KEY,
      fromProducts.reducer
    ),
    EffectsModule.forFeature([ProductsEffects]),
    HttpClientModule,
    ProductCardModule,
    RouterModule,
    ReactiveFormsModule,
    MdbTooltipModule,
    UtilSharedModule
  ],
  declarations: [
    ProductsComponent,
    ProductDetailsComponent,
    ProductSearchComponent
  ],
  exports: [
    ProductSearchComponent,
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
