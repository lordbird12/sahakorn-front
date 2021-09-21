import { takeUntil } from 'rxjs/operators';
import { ReligionService } from './../services/religion.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormReligion} from '@shared/utils/base-form-religion';
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
    private religionSvc: ReligionService,
    private router: Router,
    public religionForm: BaseFormReligion,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.religionForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.religionForm.baseForm.get('role').setValidators(null);
    this.religionForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.religionForm.baseForm.invalid) {
      return;
    }
    const formValue = this.religionForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.religionSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/branch/list']);
      });
    }
  }
}
