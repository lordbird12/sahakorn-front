import { takeUntil } from 'rxjs/operators';
import { LoanService } from './../services/loan.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormLoan} from '@shared/utils/base-form-loan';
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
    private loanSvc: LoanService,
    private router: Router,
    public loanForm: BaseFormLoan,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.loanForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.loanForm.baseForm.get('role').setValidators(null);
    this.loanForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.loanForm.baseForm.invalid) {
      return;
    }
    const formValue = this.loanForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.loanSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/branch/list']);
      });
    }
  }
}
