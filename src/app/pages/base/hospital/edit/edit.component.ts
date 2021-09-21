import { takeUntil } from 'rxjs/operators';
import { HospitalService } from './../services/hospital.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormHospital} from '@shared/utils/base-form-hospital';
import { Subscription } from 'rxjs';
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-form',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private hospitalSvc: HospitalService,
    private router: Router,
    public hospitalForm: BaseFormHospital,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.hospitalForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.hospitalForm.baseForm.get('role').setValidators(null);
    this.hospitalForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.hospitalForm.baseForm.invalid) {
      return;
    }
    const formValue = this.hospitalForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.hospitalSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/branch/list']);
      });
    }
  }
}
