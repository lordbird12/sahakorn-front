import { takeUntil } from 'rxjs/operators';
import { PermissionService } from './../services/permission.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormPermission } from '@shared/utils/base-form-permission';
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
    private permissionSvc: PermissionService,
    private router: Router,
    public permissionForm: BaseFormPermission,
    public activatedRoute: ActivatedRoute
  ) {
    console.log('extras', this.router.getCurrentNavigation().extras.state.item);
    this.permissionForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.permissionForm.baseForm.get('role').setValidators(null);
    this.permissionForm.baseForm.get('role').updateValueAndValidity();
  }

  onUpdate(): void {
    if (this.permissionForm.baseForm.invalid) {
      return;
    }
    const formValue = this.permissionForm.baseForm.value;
    console.log(formValue);
    // return false
    if (this.actionTODO === Action.EDIT)
    {
      this.permissionSvc.update(formValue.id, formValue).subscribe((res) => {
        this.router.navigate(['base/permission/list']);
      });
    }
  }
}
