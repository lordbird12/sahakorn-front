import { map, takeUntil } from 'rxjs/operators';
import { CooperativeMembersService } from './../services/cooperative-members.service';
// import {Location} from '@angular/common';
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
// import { CooperativeMembersResponse } from '@app/shared/models/base.interface';

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
    private CooperativeMembersSvc: CooperativeMembersService,
    private router: Router,
    public CooperativeMembersForm: BaseFormCooperativeMembers,
    public activatedRoute: ActivatedRoute,

  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.CooperativeMembersForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

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

  onUpdate(): void {

    if (this.CooperativeMembersForm.baseForm.invalid) {
      return;
    }
    const formValue = this.CooperativeMembersForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.CooperativeMembersSvc.update(formValue.id, formValue).subscribe((res) => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.router.navigate(['managecooperative/cooperative-members/list']);
      });
    }
  }





}
