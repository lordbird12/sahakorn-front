// import { BaseFormPositionType } from './../../../../shared/utils/base-form-position-type';
import { map, takeUntil } from 'rxjs/operators';
import { PositionGroupService } from '../services/position-group.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPositionGroup } from '@shared/utils/base-form-position-group';
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
    private positiongroupSvc: PositionGroupService,
    private router: Router,
    public positionGroupForm: BaseFormPositionGroup,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.positionGroupForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.positionGroupForm.baseForm.get('role').setValidators(null);
    this.positionGroupForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.positionGroupForm.baseForm.invalid) {
      return;
    }
    const formValue = this.positionGroupForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.positiongroupSvc.update(formValue.id, formValue).subscribe((res) => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.router.navigate(['base/position-group/list']);
      });
    }
  }

}
