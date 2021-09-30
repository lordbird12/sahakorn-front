import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormCooperative {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    cooperative_id: [
      '',
    ],
    account_name: [
      '',
      // [Validators.required],
    ],
    address: [
      '',
      // [Validators.required],
    ],
    cooperative_no: [
      '',
      // [Validators.required],
    ],
    bank_name: [
      '',
      // [Validators.required],
    ],
    name: [
      '',
      // [Validators.required],
    ],
    start_date: [
      '',
      // [Validators.required],
    ],
    type: [
      '',
      // [Validators.required],
    ],
    tax_id: [
      '',
      // [Validators.required],
    ],
    bank_batch: [
      '',
      // [Validators.required],
    ],
    bank_id: [
      '',
      // [Validators.required],
    ],
    road: [
      '',
      // [Validators.required],
    ],
    district: [
      '',
      // [Validators.required],
    ],
    sub_district: [
      '',
      // [Validators.required],
    ],
    province_id: [
      '',
      // [Validators.required],
    ],
    zipcode: [
      '',
      // [Validators.required],
    ],
    phone: [
      '',
      // [Validators.required],
    ],
    fax: [
      '',
      // [Validators.required],
    ],
    village: [
      '',
      // [Validators.required],
    ],
    logo: [
      '',
      // [Validators.required],
    ],
    map: [
      '',
      // [Validators.required],
    ],

    // role: ['', [Validators.required]],
  });

  isValidField(field: string): boolean {
    this.getErrorMessage(field);
    return (
      (this.baseForm.get(field).touched || this.baseForm.get(field).dirty) &&
      !this.baseForm.get(field).valid
    );
  }

  private getErrorMessage(field: string): void {
    const { errors } = this.baseForm.get(field);

    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages = {
        required: 'You must enter a value.',
        pattern: 'Not a valid email.',
        minlength: `This field must be longer than ${minlenght} characters`,
      };

      const errorKey = Object.keys(errors).find(Boolean);
      this.errorMessage = messages[errorKey];
    }
  }
}
