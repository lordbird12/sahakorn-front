import { takeUntil } from 'rxjs/operators';
import { PositionLevelService } from './../services/position-level.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPositionLevel} from '@shared/utils/base-form-position-level';
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
    private positionlevelSvc: PositionLevelService,
    private router: Router,
    public positionlevelForm: BaseFormPositionLevel,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.positionlevelForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

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


  onUpdate(): void {

    if (this.positionlevelForm.baseForm.invalid) {
      return;
    }
    const formValue = this.positionlevelForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.positionlevelSvc.update(formValue.id, formValue).subscribe((res) => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.router.navigate(['base/position-level/list']);
      });
    }
  }
}
