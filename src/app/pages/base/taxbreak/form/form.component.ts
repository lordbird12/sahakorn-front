import { takeUntil } from 'rxjs/operators';
import { TaxbreakService } from '../services/taxbreak.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormTaxbreak } from '@shared/utils/base-form-taxbreak';
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
    private taxbreakSvc: TaxbreakService,
    private router: Router,
    public taxbreakForm: BaseFormTaxbreak
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.taxbreakForm.baseForm.get('role').setValidators(null);
    this.taxbreakForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.taxbreakForm.baseForm.invalid) {
      return;
    }

    const formValue = this.taxbreakForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.taxbreakSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
