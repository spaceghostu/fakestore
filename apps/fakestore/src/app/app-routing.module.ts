import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailsComponent, ProductsComponent } from '@fakestore/fakestore-feature-products';
import { CartComponent } from '@fakestore/fakestore-feature-cart';
import { CheckoutComponent } from '@fakestore/fakestore-feature-checkout';
import { ShippingComponent } from '@fakestore/fakestore-feature-checkout';
import { PaymentComponent } from '@fakestore/fakestore-feature-checkout';


const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  {
    path: 'checkout',
    component: CheckoutComponent,
    children: [
      { path: '', redirectTo: 'shipping', pathMatch: 'full' },
      { path: 'shipping', component: ShippingComponent },
      { path: 'payment', component: PaymentComponent },
    ]
  },
  { path: '**', component: ProductsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }