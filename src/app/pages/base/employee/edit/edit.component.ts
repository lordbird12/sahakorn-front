import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormEmployee } from '@shared/utils/base-form-employee';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
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
  public DepartmentData: any = [];
  public BranchData: any = [];
  public PositionData: any = [];
  public PermissionData: any = [];
  public ProfileData: any = [];

  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    public employeeForm: BaseFormEmployee,
    public activatedRoute: ActivatedRoute,
  ) {
    console.log('extrasEdit111', this.router.getCurrentNavigation().extras.state.item);
    this.employeeForm.baseForm.setValue(this.router.getCurrentNavigation().extras.state.item);
    console.log(this.employeeForm.baseForm.value.image);

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    // this.employeeForm.baseForm.get('role').setValidators(null);
    // this.employeeForm.baseForm.get('role').updateValueAndValidity();
    this.GetDepartment();
    this.GetBranch();
    this.GetPosition();
    // this.GetPermission();


  }
  GetDepartment(): void {
    this.employeeSvc.getDepartment().subscribe(resp => {
      this.DepartmentData = resp.data;
      console.log(this.DepartmentData);
    });

   }
   GetBranch(): void {
    this.employeeSvc.getBranch().subscribe(resp => {
      this.BranchData = resp.data;
      console.log(this.BranchData);
    });

   }
   GetPosition(): void {
    this.employeeSvc.getPosition().subscribe(resp => {
      this.PositionData = resp.data;
      console.log(this.PositionData);
    });

   }
  //  GetPermission(): void {
  //   this.employeeSvc.getPermission().subscribe(resp => {
  //     this.PermissionData = resp.data;
  //     console.log(this.PermissionData);
  //   });

  //  }

  onUpdate(): void {
    const formData = new FormData();
    Object.entries(this.employeeForm.baseForm.value).forEach(([key, value]: any[]) => {
      formData.append(key, value);
    });
    if (this.employeeForm.baseForm.invalid) {
      return;
    }
    const formValue = this.employeeForm.baseForm.value;


    if (this.actionTODO === Action.EDIT)
    {
      this.employeeSvc.update(formValue.id, formData).subscribe((res) => {
        alert("บันทึกข้อมูลสำเร็จ");
        this.router.navigate(['base/employee/list']);
      });
    }
  }

  onChange(event: any): void {
    const file = event.target.files[0];
    this.employeeForm.baseForm.patchValue({
      image: file
    });

  }


  onChangeSignature(event: any): void {
    const file = event.target.files[0];
    this.employeeForm.baseForm.patchValue({
      signature: file
    });

  }
}





