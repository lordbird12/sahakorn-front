import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormCooperativeMembers {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    person_id: [
      '',
      [Validators.required],
    ],
    type: [
      '',
      [Validators.required],
    ],
    status: [
      '',
      [Validators.required],
    ],
    share_qty: [
      '',
      [Validators.required],
    ],
    share_amount: [
      '',
      [Validators.required],
    ],
    sum_share_qty: [
      '',
      [Validators.required],
    ],
    sum_share_amount: [
      '',
      [Validators.required],
    ],
    share_pay: [
      '',
      [Validators.required],
    ],
    share_doc: [
      '',
      // [Validators.required],
    ],
    member_doc: [
      '',
      // [Validators.required],
    ],
    member_date: [
      '',
      [Validators.required],
    ],
    resign_doc: [
      '',
      // [Validators.required],
    ],
    resign_date: [
      '',
      // [Validators.required],
    ],
    resign_id: [
      '',
      // [Validators.required],
    ],
    reason: [
      '',
      // [Validators.required],
    ],
    create_by: [
      '',
      // [Validators.required],
    ],
    update_by: [
      '',
      // [Validators.required],
    ],
    created_at: [
      '',
      [Validators.required],
    ],
    updated_at: [
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
