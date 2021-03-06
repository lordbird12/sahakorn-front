import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormCompany {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    company_id: [
      '',
      // [Validators.required],
    ],
    code: [
      '',
      [Validators.required],
    ],
    name_th: [
      '',
      [Validators.required],
    ],
    name_en: [
      '',
      [Validators.required],
    ],
    abbreviation: [
      '',
      [Validators.required],
    ],
    tax_id: [
      '',
      [Validators.required],
    ],
    bank_id: [
      '',
      [Validators.required],
    ],
    bank_name: [
      '',
      [Validators.required],
    ],
    account_name: [
      '',
      [Validators.required],
    ],
    bank_batch: [
      '',
      [Validators.required],
    ],
    address: [
      '',
      [Validators.required],
    ],
    village: [
      '',
      [Validators.required],
    ],
    road: [
      '',
      [Validators.required],
    ],
    sub_district: [
      '',
      [Validators.required],
    ],
    district: [
      '',
      [Validators.required],
    ],
    province_id: [
      '',
      [Validators.required],
    ],
    zipcode: [
      '',
      [Validators.required],
    ],
    phone: [
      '',
      [Validators.required],
    ],
    fax: [
      '',
      [Validators.required],
    ],
    map: [
      '',
      [Validators.required],
    ],
    map2: [
      '',
      [Validators.required],
    ],
    logo: [
      '',
      [Validators.required],
    ],
    role: ['', [Validators.required]],
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
