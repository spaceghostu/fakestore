import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';
import { FilterCategoryPipe } from './pipes/filter-category.pipe';



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
