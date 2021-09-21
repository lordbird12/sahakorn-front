import { takeUntil } from 'rxjs/operators';
import { LoanService } from '../services/loan.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormLoan } from '@shared/utils/base-form-loan';
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
    private loanSvc: LoanService,
    private router: Router,
    public loanForm: BaseFormLoan
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    console.log('test');
  }

  ngOnInit(): void {
    this.loanForm.baseForm.get('role').setValidators(null);
    this.loanForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.loanForm.baseForm.invalid) {
      return;
    }

    const formValue = this.loanForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.loanSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/branch/list']);
      });
    }
  }

}
