import { takeUntil } from 'rxjs/operators';
import { HospitalService } from '../services/hospital.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormHospital } from '@shared/utils/base-form-hospital';
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
    private hospitalSvc: HospitalService,
    private router: Router,
    public hospitalForm: BaseFormHospital
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.hospitalForm.baseForm.get('role').setValidators(null);
    this.hospitalForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.hospitalForm.baseForm.invalid) {
      return;
    }

    const formValue = this.hospitalForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.hospitalSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
