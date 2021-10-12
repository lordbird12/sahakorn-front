import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormLoantype {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    name: [
      '',
      [Validators.required],
    ],
    description: [
      '',
      [Validators.required],
    ],
    abbreviation: [
      '',
      [Validators.required],
    ],
    interest_rate: [
      '',
      [Validators.required],
    ],
    member_age: [
      '',
      [Validators.required],
    ],
    supporter_age: [
      '',
      [Validators.required],

    ],
    share: [
      '',
      [Validators.required],
    ],
    supporter: [
      '',
      [Validators.required],
    ],
    property: [
      '',
      [Validators.required],
    ],
    sup_num: [
      '',
      [Validators.required],
    ],
    share_limit: [
      '',
      [Validators.required],
    ],
    share_time: [
      '',
      [Validators.required],
    ],
    share_doc: [
      '',
      [Validators.required],
    ],
    share_process: [
      '',
      [Validators.required],
    ],
    supporter_limit: [
      '',
      // [Validators.required],
    ],
    supporter_time: [
      '',
      // [Validators.required],
    ],
    supporter_doc: [
      '',
      // [Validators.required],
    ],
    supporter_process: [
      '',
      // [Validators.required],
    ],
    objective: [
      '',
      // [Validators.required],
    ],
    remark: [
      '',
      // [Validators.required],
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
