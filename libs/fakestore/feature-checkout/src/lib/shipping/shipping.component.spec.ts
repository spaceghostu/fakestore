import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckoutFacade } from '../+state/checkout.facade';

import { ShippingComponent } from './shipping.component';
import { createEmptyShippingDetails } from '@fakestore/util/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ShippingComponent', () => {
  let component: ShippingComponent;
  let fixture: ComponentFixture<ShippingComponent>;

  const mockShippingDetails = createEmptyShippingDetails();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: Router,
          useValue: {}
        },
        {
          provide: CheckoutFacade,
          useValue: {
            shippingDetails$: of(mockShippingDetails)
          }
        },
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all form inputs', () => {
    const inputs = fixture.debugElement.queryAll(By.css('input'));
    const select = fixture.debugElement.queryAll(By.css('ng-select'));
    expect(inputs.length).toBe(9);
    expect(select.length).toBe(1);
  });

  it('should initialize the form values', () => {
    const form = component.shippingForm;
    expect(form.value).toMatchObject(mockShippingDetails);
  });

  describe('firstName', () => {
    it('should display an error when empty and touched', () => {
      const firstNameInput = fixture.debugElement.query(By.css('[formcontrolname="firstName"]')).nativeElement;
      firstNameInput.focus();
      firstNameInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('First Name is required.');
    });
  });

  describe('lastName', () => {
    it('should display an error when empty and touched', () => {
      const lastNameInput = fixture.debugElement.query(By.css('[formcontrolname="lastName"]')).nativeElement;
      lastNameInput.focus();
      lastNameInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Last Name is required.');
    });
  });

  describe('email', () => {
    it('should display an error when empty and touched', () => {
      const emailInput = fixture.debugElement.query(By.css('[formcontrolname="email"]')).nativeElement;
      emailInput.focus();
      emailInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Email is required.');
    });

    it('should display an error not a valid email and touched', () => {
      const emailInput = fixture.debugElement.query(By.css('[formcontrolname="email"]')).nativeElement;
      emailInput.focus();
      component.shippingForm.controls.email.setValue('e');
      emailInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Invalid email format');
    });
  });

  describe('phone', () => {
    it('should display an error when empty and touched', () => {
      const phoneInput = fixture.debugElement.query(By.css('[formcontrolname="phone"]')).nativeElement;
      phoneInput.focus();
      phoneInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Phone number is required.');
    });

    it('should display an error not a valid phone and touched', () => {
      const phoneInput = fixture.debugElement.query(By.css('[formcontrolname="phone"]')).nativeElement;
      phoneInput.focus();
      component.shippingForm.controls.phone.setValue('e');
      phoneInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Invalid phone format');
    });
  });


  describe('street', () => {
    it('should display an error when empty and touched', () => {
      const streetInput = fixture.debugElement.query(By.css('[formcontrolname="street"]')).nativeElement;
      streetInput.focus();
      streetInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Street is required.');
    });
  });


  describe('suburb', () => {
    it('should display an error when empty and touched', () => {
      const suburbInput = fixture.debugElement.query(By.css('[formcontrolname="suburb"]')).nativeElement;
      suburbInput.focus();
      suburbInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Suburb is required.');
    });
  });

  describe('province', () => {
    it('should display an error when empty and touched', () => {
      const provinceInput = fixture.debugElement.query(By.css('[formcontrolname="province"]')).nativeElement;
      provinceInput.focus();
      provinceInput.blur();
      fixture.detectChanges();
      const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
      expect(error.textContent.trim()).toBe('Province is required.');
    });

    // TODO
    // describe('country', () => {
    //   it('should display an error when empty and touched', () => {
    //     const countryInput = fixture.debugElement.query(By.css('[formcontrolname="country"]')).nativeElement;
    //     countryInput.focus();
    //     countryInput.blur();
    //     fixture.detectChanges();
    //     const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
    //     expect(error.textContent.trim()).toBe('Country is required.');
    //   });
    // });

    describe('code', () => {
      it('should display an error when empty and touched', () => {
        const codeInput = fixture.debugElement.query(By.css('[formcontrolname="code"]')).nativeElement;
        codeInput.focus();
        codeInput.blur();
        fixture.detectChanges();
        const error = fixture.debugElement.query(By.css('.form-error')).nativeElement;
        expect(error.textContent.trim()).toBe('Code is required.');
      });
    });

  });
});