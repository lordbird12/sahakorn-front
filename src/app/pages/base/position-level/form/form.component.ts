import { takeUntil } from 'rxjs/operators';
import { PositionLevelService } from '../services/position-level.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormPositionLevel } from '@shared/utils/base-form-position-level';
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
    private educationSvc: PositionLevelService,
    private router: Router,
    public positionlevelForm: BaseFormPositionLevel
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.positionlevelForm.baseForm.get('role').setValidators(null);
    this.positionlevelForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.positionlevelForm.baseForm.invalid) {
      return;
    }

    const formValue = this.positionlevelForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.educationSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
