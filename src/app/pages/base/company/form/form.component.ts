import { map, takeUntil } from 'rxjs/operators';
import { CompanyService } from './../services/company.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCompany } from '@shared/utils/base-form-company';
import { Observable, Subscription } from 'rxjs';
import { CompanyResponse } from '@app/shared/models/base.interface';
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
  state: Observable<CompanyResponse>;


  constructor(
    private companySvc: CompanyService,
    private router: Router,
    public companyForm: BaseFormCompany,
    public activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        console.log(params);

      });


    this.companyForm.baseForm.get('role').setValidators(null);
    this.companyForm.baseForm.get('role').updateValueAndValidity();
  }

  onAdd(): void {
    if (this.companyForm.baseForm.invalid) {
      return;
    }

    const formValue = this.companyForm.baseForm.value;
    // console.log(formValue);
    // return false
    if (this.actionTODO === Action.NEW) {
      this.companySvc.new(formValue).subscribe((res) => {
        this.router.navigate(['base/company/list']);
      });
    }
  }

}
