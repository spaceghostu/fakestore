import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countryList } from '@fakestore/util/shared';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShippingComponent implements OnDestroy {

  shippingForm!: FormGroup;
  countries = countryList;
  destroyed$ = new Subject();
  showErrors = false;


  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.shippingForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('[- +0-9]+')]],
      address: this.fb.group({
        apartment: [''],
        street: ['', [Validators.required]],
        suburb: ['', [Validators.required]],
        province: ['', [Validators.required]],
        country: ['', [Validators.required]],
        code: ['', [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(4), Validators.maxLength(4)]],
      }),
    });


    // Change phone control max length depending on if it is in
    // long or short format
    this.shippingForm.controls['phone'].valueChanges.pipe(
      takeUntil(this.destroyed$)
    ).subscribe(value => {
      if (value.includes('+')) {
        this.shippingForm.get('phone')?.removeValidators(Validators.maxLength(10));
        this.shippingForm.get('phone')?.addValidators(Validators.maxLength(13));
      } else {
        this.shippingForm.get('phone')?.removeValidators(Validators.maxLength(13));
        this.shippingForm.get('phone')?.addValidators(Validators.maxLength(10));
      }
    });
  }

  handleSubmit() {
    this.showErrors = true;
    if (this.shippingForm.invalid) return;
    this.router.navigate(['checkout', 'payment']);
  }

  ngOnDestroy() {
    this.destroyed$.next(0);
    this.destroyed$.complete();
  }

}
