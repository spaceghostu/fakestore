import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterCategoryPipe } from './filter-category.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterCategoryPipe,
  ],
  exports: [
    FilterPipe,
    FilterCategoryPipe,
  ],
  imports: [
    CommonModule
  ]
})
export class UtilSharedModule { }
