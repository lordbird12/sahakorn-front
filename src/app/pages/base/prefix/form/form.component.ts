import { map, takeUntil } from 'rxjs/operators';
import { PrefixService } from '../services/prefix.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPrefix } from '@shared/utils/base-form-prefix';
import { Observable, Subscription } from 'rxjs';
import { PrefixResponse } from '@app/shared/models/base.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  state: Observable<PrefixResponse>;


  constructor(
    private prefixSvc: PrefixService,
    private router: Router,
    public prefixForm: BaseFormPrefix,
    public activatedRoute: ActivatedRoute
  ) {
    // console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    // this.prefixForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    // this.activatedRoute
    //   .queryParams
    //   .subscribe(params => {
    //     console.log(params);

    //   });


    this.prefixForm.baseForm.get('role').setValidators(null);
    this.prefixForm.baseForm.get('role').updateValueAndValidity();
  }



  onAdd(): void {

    if (this.prefixForm.baseForm.invalid) {
      alert("กรอกข้อมูลไม่ครบกรุณาตรวจสอบ");
      return;
    }

    const formValue = this.prefixForm.baseForm.value;
    console.log(formValue);

    if (this.actionTODO === Action.NEW) {
      this.prefixSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/prefix/list']);
      });
    }
  }

}
