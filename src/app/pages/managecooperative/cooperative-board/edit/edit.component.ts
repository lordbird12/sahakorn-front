import { map, takeUntil } from 'rxjs/operators';
import { CooperativeBoardService } from './../services/cooperative-board.service';
import {Location} from '@angular/common';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCooperativeBoard } from '@shared/utils/base-form-cooperative-board';
import { Observable, Subscription } from 'rxjs';
import { CooperativeBoardResponse } from '@app/shared/models/base.interface';

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
  state: Observable<CooperativeBoardResponse>;

  constructor(
    private CooperayiveBoardSvc: CooperativeBoardService ,
    private router: Router,
    public CooperativeBoardForm: BaseFormCooperativeBoard,
    public activatedRoute: ActivatedRoute,

  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.CooperativeBoardForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.CooperativeBoardForm.baseForm.get('role').setValidators(null);
    this.CooperativeBoardForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.CooperativeBoardForm.baseForm.invalid) {
      return;
    }
    const formValue = this.CooperativeBoardForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.CooperayiveBoardSvc.update(formValue.id, formValue).subscribe((res) => {
        alert("บันทึกสำเร็จ");
        this.router.navigate(['managecooperative/cooperative-board/list']);
      });
    }
  }





}
