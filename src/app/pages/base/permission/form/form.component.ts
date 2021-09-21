import { takeUntil } from 'rxjs/operators';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormPermission } from './../../../../shared/utils/base-form-permission';
import { PermissionService } from './../services/permission.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';

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
  public GetPermissionMenu: any = [];
  public MenuName: any = [];



  constructor(
    private permissionSvc: PermissionService,
    private router: Router,
    public permissionForm: BaseFormPermission
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.permissionForm.baseForm.get('role').setValidators(null);
    this.permissionForm.baseForm.get('role').updateValueAndValidity();
    this.GetMenu();
  }

  GetMenu(): void {
    this.permissionSvc.getPermissionMenu().subscribe(resp => {
      this.GetPermissionMenu = resp.data;
      console.log(this.GetPermissionMenu);
    });

   }

  onAdd(): void {
    if (this.permissionForm.baseForm.invalid) {
      return;
    }
    const formValue = this.permissionForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.permissionSvc.new(formValue).subscribe((res) => {
        this.router.navigate(['base/permission/list']);
      });
    }
  }

  CheckPermission(event): void {
    this.MenuName.push(event);
    this.permissionForm.baseForm.patchValue({
      menu_name: this.MenuName
    });
    // console.log(this.MenuName);
  }

  }


