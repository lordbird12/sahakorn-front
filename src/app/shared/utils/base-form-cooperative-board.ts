import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormCooperativeBoard {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    account_year_id: [
      '',
      [Validators.required],
    ],
    status: [
      '',
      [Validators.required],
    ],
    member_id: [
      '',
      [Validators.required],
    ],
    position: [
      '',
      [Validators.required],
    ],
    start_date: [
      '',
      [Validators.required],
    ],
    end_date: [
      '',
      [Validators.required],
    ],
    term: [
      '',
      [Validators.required],
    ],
    year: [
      '',
      [Validators.required],
    ],
    phase: [
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
