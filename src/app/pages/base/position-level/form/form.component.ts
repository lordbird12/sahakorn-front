import { takeUntil } from 'rxjs/operators';
import { PositionLevelService } from '../services/position-level.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseFormPositionLevel } from '@shared/utils/base-form-position-level';
import { Subscription, Observable } from 'rxjs';
import { PositionLevelResponse } from '@app/shared/models/base.interface';
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
  state: Observable<PositionLevelResponse>;

  constructor(
    private positionlevelSvc: PositionLevelService,
    private router: Router,
    public positionlevelForm: BaseFormPositionLevel,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.positionlevelForm.baseForm.get('role').setValidators(null);
    this.positionlevelForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.positionlevelForm.baseForm.invalid) {
      alert("กรอกข้อมูลไม่ครบกรุณาตรวจสอบ");
      return;
    }

    const formValue = this.positionlevelForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.positionlevelSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/position-level/list']);
      });
    }
  }

}
