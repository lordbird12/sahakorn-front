import { takeUntil } from 'rxjs/operators';
import { EducationService } from './../services/education.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormEducation } from '@shared/utils/base-form-education';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private educationSvc: EducationService,
    private router: Router,
    public educationForm: BaseFormEducation
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.educationForm.baseForm.get('role').setValidators(null);
    this.educationForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.educationForm.baseForm.invalid) {
      return;
    }

    const formValue = this.educationForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.educationSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
