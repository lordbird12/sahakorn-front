import { takeUntil } from 'rxjs/operators';
import { EducationService } from './../services/education.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormEducation} from '@shared/utils/base-form-education';
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
    private educationSvc: EducationService,
    private router: Router,
    public educationForm: BaseFormEducation,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.educationForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.educationForm.baseForm.get('role').setValidators(null);
    this.educationForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {

    if (this.educationForm.baseForm.invalid) {
      return;
    }
    const formValue = this.educationForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT) {
      this.educationSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/branch/list']);
      });
    }
  }
}
