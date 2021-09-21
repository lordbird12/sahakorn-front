import { takeUntil } from 'rxjs/operators';
import { ReligionService } from '../services/religion.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormReligion } from '@shared/utils/base-form-religion';
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
    private religionSvc: ReligionService,
    private router: Router,
    public religionForm: BaseFormReligion
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.religionForm.baseForm.get('role').setValidators(null);
    this.religionForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.religionForm.baseForm.invalid) {
      return;
    }

    const formValue = this.religionForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.religionSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
