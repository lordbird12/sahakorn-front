import { takeUntil } from 'rxjs/operators';
import { PositionTypeService } from '../services/position-type.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormPositionType } from '@shared/utils/base-form-position-type';
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
    private educationSvc: PositionTypeService,
    private router: Router,
    public positiontypeForm: BaseFormPositionType
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.positiontypeForm.baseForm.get('role').setValidators(null);
    this.positiontypeForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.positiontypeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.positiontypeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.educationSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/position-type/list']);
      });
    }
  }

}
