import { takeUntil } from 'rxjs/operators';
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
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements AfterViewInit, OnInit, OnDestroy {

  actionTODO = Action.NEW;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  state: Observable<CooperativeBoardResponse>;

  constructor(
    private CooperayiveBoardSvc: CooperativeBoardService ,
    private router: Router,
    public CooperativeBoardForm: BaseFormCooperativeBoard,
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
    this.CooperativeBoardForm.baseForm.get('role').setValidators(null);
    this.CooperativeBoardForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {

    // alert("pp");
    console.log(this.CooperativeBoardForm.baseForm.value);
    if (this.CooperativeBoardForm.baseForm.invalid) {
      alert("กรอกข้อมูลไม่ครบกรุณาตรวจสอบ");
      return;
    }

    const formValue = this.CooperativeBoardForm.baseForm.value;
    console.log(formValue)

    if (this.actionTODO === Action.NEW) {
      this.CooperayiveBoardSvc.new(formValue).subscribe((res) => {

        this.router.navigate(['managecooperative/cooperative-board/list']);
      });
    }
  }
}
