import { takeUntil } from 'rxjs/operators';
import { CooperativeMembersService } from '../services/cooperative-members.service';
import {Location} from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCooperativeMembers } from '@shared/utils/base-form-cooperative-members';
import { Observable, Subscription } from 'rxjs';
import { CooperativeMembersResponse } from '@app/shared/models/base.interface';

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
  state: Observable<CooperativeMembersResponse>;

  constructor(
    private loantypeSvc: CooperativeMembersService ,
    private router: Router,
    public CooperativeMembersForm: BaseFormCooperativeMembers,
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
    this.CooperativeMembersForm.baseForm.get('role').setValidators(null);
    this.CooperativeMembersForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {

    // alert("pp");
    console.log(this.CooperativeMembersForm.baseForm.value);
    if (this.CooperativeMembersForm.baseForm.invalid) {
      // alert("กรอกข้อมูลไม่ครบกรุณาตรวจสอบ");
      return;
    }

    const formValue = this.CooperativeMembersForm.baseForm.value;
    console.log(formValue)

    if (this.actionTODO === Action.NEW) {
      this.loantypeSvc.new(formValue).subscribe((res) => {

        this.router.navigate(['managecooperative/cooperative-members/list']);
      });
    }
  }
}
