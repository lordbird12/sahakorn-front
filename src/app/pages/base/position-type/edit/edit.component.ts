// import { BaseFormPositionType } from './../../../../shared/utils/base-form-position-type';
import { map, takeUntil } from 'rxjs/operators';
import { PositionTypeService } from '../services/position-type.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPositionType } from '@shared/utils/base-form-position-type';
import { Observable, Subscription } from 'rxjs';
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
    private positivetypeSvc: PositionTypeService,
    private router: Router,
    public positionTypeForm: BaseFormPositionType,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.positionTypeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.positionTypeForm.baseForm.get('role').setValidators(null);
    this.positionTypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.positionTypeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.positionTypeForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.positivetypeSvc.update(formValue.id, formValue).subscribe((res) => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.router.navigate(['base/position-type/list']);
      });
    }
  }

}
