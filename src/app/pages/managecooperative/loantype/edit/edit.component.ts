import { map, takeUntil } from 'rxjs/operators';
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
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  state: Observable<LoantypeResponse>;
  public Cooperativedata: any = [];

  constructor(
    private loantypeSvc: LoantypeService,
    private router: Router,
    public loantypeForm: BaseFormLoantype,
    public activatedRoute: ActivatedRoute,
    private _location: Location

  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.loantypeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

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

  onUpdate(): void {

    if (this.loantypeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.loantypeForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.loantypeSvc.update(formValue.id, formValue).subscribe((res) => {
        alert("บันทึกสำเร็จ");
        this.router.navigate(['managecooperative/loantype/list']);
      });
    }
  }





}
