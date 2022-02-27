import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { ProductsModule } from '@fakestore/fakestore-feature-products';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProductsModule,
    MdbCollapseModule,
    MdbDropdownModule,
    RouterModule,
  ],
  declarations: [NavbarComponent, CategorySelectorComponent],
  exports: [NavbarComponent]
})
export class NavbarModule { }
