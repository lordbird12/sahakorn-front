import { FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseFormEmployee {
  private isValidEmail = /\S+@\S+\.\S+/;
  errorMessage = null;

  constructor(private fb: FormBuilder) { }

  baseForm = this.fb.group({
    id: [
      '',
    ],
    prefix_id: [
      '',
      [Validators.required],
    ],
    company_id: [
      '',
      [Validators.required],
    ],
    branch_id: [
      '',
      [Validators.required],

    ],
    division_id: [
      '',
      Validators.required
    ],
    department_id: [

      '',
      [Validators.required],
    ],
    position_id: [

      '',
      [Validators.required],
    ],
    person_type_id: [

      '',
      [Validators.required],
    ],
    position_group_id: [

      '',
      // [Validators.required],
    ],
    position_type_id: [
      '',
      // [Validators.required],

    ],
    position_level_id: [
      '',
      // [Validators.required],

    ],
    person_id: [
      '',
      [Validators.required],

    ],
    card_id: [
      '',
      [Validators.required],

    ],
    name: [
      '',
      [Validators.required],

    ],
    name_en: [
      '',
      [Validators.required],

    ],

    sex: [
      '',
      [Validators.required],

    ],

    position_number: [
      '',
      // [Validators.required],

    ],

    id_card: [
      '',
      [Validators.required],

    ],

    email: [
      '',
      [Validators.required],

    ],

    photo: [
      '',
      [Validators.required],

    ],

    phone: [
      '',
      // [Validators.required],

    ],

    birthday: [
      '',
      [Validators.required],

    ],

    start_work_date: [
      '',
      [Validators.required],

    ],

    role: ['', [Validators.required]],

  }


  );



  get password(): any { return this.baseForm.get('password'); }
  get confirm_password(): any { return this.baseForm.get('confirm_password'); }
  get email(): any { return this.baseForm.get('email'); }


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
