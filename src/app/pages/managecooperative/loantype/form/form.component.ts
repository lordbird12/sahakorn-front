import { takeUntil } from 'rxjs/operators';
import { LoantypeService } from './../services/loantype.service';
import {Location} from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormLoantype } from '@shared/utils/base-form-loantype';
import { Observable, Subscription } from 'rxjs';
import { LoantypeResponse } from '@app/shared/models/base.interface';

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
  state: Observable<LoantypeResponse>;

  constructor(
    private loantypeSvc: LoantypeService ,
    private router: Router,
    public loantypeForm: BaseFormLoantype,
    public activatedRoute: ActivatedRoute,
    private _location: Location
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.loantypeForm.baseForm.get('role').setValidators(null);
    this.loantypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {

    // alert("pp");
    console.log(this.loantypeForm.baseForm.value);
    if (this.loantypeForm.baseForm.invalid) {
      alert("กรอกข้อมูลไม่ครบกรุณาตรวจสอบ");
      return;
    }

    const formValue = this.loantypeForm.baseForm.value;
    console.log(formValue)

    if (this.actionTODO === Action.NEW) {
      this.loantypeSvc.new(formValue).subscribe((res) => {

        this.router.navigate(['managecooperative/loantype/list']);
      });
    }
  }
}
