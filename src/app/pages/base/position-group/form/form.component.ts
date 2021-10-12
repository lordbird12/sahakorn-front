import { takeUntil } from 'rxjs/operators';
import { PositionGroupService } from '../services/position-group.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormPositionGroup } from '@shared/utils/base-form-position-group';
import { Subscription } from 'rxjs';
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

  constructor(
    private educationSvc: PositionGroupService,
    private router: Router,
    public positiongroupForm: BaseFormPositionGroup
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.positiongroupForm.baseForm.get('role').setValidators(null);
    this.positiongroupForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.positiongroupForm.baseForm.invalid) {
      return;
    }

    const formValue = this.positiongroupForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.educationSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/position-group/list']);
      });
    }
  }

}
