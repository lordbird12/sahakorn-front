import { takeUntil } from 'rxjs/operators';
import { TaxbreakService } from './../services/taxbreak.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormTaxbreak} from '@shared/utils/base-form-taxbreak';
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
    private taxbreakSvc: TaxbreakService,
    private router: Router,
    public taxbreakForm: BaseFormTaxbreak,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.taxbreakForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.taxbreakForm.baseForm.get('role').setValidators(null);
    this.taxbreakForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.taxbreakForm.baseForm.invalid) {
      return;
    }
    const formValue = this.taxbreakForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.taxbreakSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/branch/list']);
      });
    }
  }
}
