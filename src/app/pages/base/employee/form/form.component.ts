import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { BaseFormEmployee } from '@shared/utils/base-form-employee';
import { Observable, Subscription } from 'rxjs';
import { EmployeeResponse } from '@app/shared/models/base.interface';
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
  state: Observable<EmployeeResponse>;


  public PrefixData: any = [];
  public CompanyData: any = [];
  public BranchData: any = [];
  public DivitionData: any = [];
  public DepartmentData: any = [];
  public PositionData: any = [];
  public PersosTypeData: any = [];
  public PositionGroupData: any = [];
  public PositionTypeData: any = [];
  public PositionLevelData: any = [];

  url: any; //Angular 11, for stricter type
	msg = "";



  constructor(
    private employeeSvc: EmployeeService,
    private router: Router,
    public employeeForm: BaseFormEmployee
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.employeeForm.baseForm.get('role').setValidators(null);
    this.employeeForm.baseForm.get('role').updateValueAndValidity();
    this.getPrefix();
    this.getCompany();
    this.getBranch();
    this.getDivition();
    this.getDepartment();
    this.getPosition();
    this.getPersosType();
    this.getPositionGroup();
    this.getPositionType();
    this.getPositionLevel();

  }

  getPrefix(): void {
    this.employeeSvc.getPrefix().subscribe(resp => {
      this.PrefixData = resp.data;
      console.log(this.PrefixData);
    });

   }

   getCompany(): void {
    this.employeeSvc.getCompany().subscribe(resp => {
      this.CompanyData = resp.data;
      console.log(this.CompanyData);
    });

   }

   getBranch(): void {
    this.employeeSvc.getBranch().subscribe(resp => {
      this.BranchData = resp.data;
      console.log(this.BranchData);
    });

   }

   getDivition(): void {
    this.employeeSvc.getDivition().subscribe(resp => {
      this.DivitionData = resp.data;
      console.log(this.DivitionData);
    });

   }

   getPosition(): void {
    this.employeeSvc.getPosition().subscribe(resp => {
      this.PositionData = resp.data;
      console.log(this.PositionData);
    });

   }

   getPersosType(): void {
    this.employeeSvc.getPersosType().subscribe(resp => {
      this.PersosTypeData = resp.data;
      console.log(this.PersosTypeData);
    });

   }

   getPositionGroup(): void {
    this.employeeSvc.getPositionGroup().subscribe(resp => {
      this.PositionGroupData = resp.data;
      console.log(this.PositionGroupData);
    });

   }

  getDepartment(): void {
  this.employeeSvc.getDepartment().subscribe(resp => {
    this.DepartmentData = resp.data;
    console.log(this.DepartmentData);
  });

 }
 getPositionType(): void {
  this.employeeSvc.getPositionType().subscribe(resp => {
    this.PositionTypeData = resp.data;
    console.log(this.PositionTypeData);
  });

 }
 getPositionLevel(): void {
  this.employeeSvc.getPositionLevel().subscribe(resp => {
    this.PositionLevelData = resp.data;
    console.log(this.PositionLevelData);
  });

 }

  onAdd(): void {
    if (this.employeeForm.baseForm.invalid) {
      return;
    }

    const formValue = this.employeeForm.baseForm.value;
    if (this.actionTODO === Action.NEW) {
      this.employeeSvc.new(formValue).subscribe((res) => {
        console.log('New ', res);
        this.router.navigate(['base/employee/list']);
      });
    }
  }

  selectFile(event: any): void {
    const file = event.target.files[0];
    this.employeeForm.baseForm.patchValue({
      image: file
    });

    // if(!event.target.files[0] || event.target.files[0].length == 0) {
		// 	this.msg = 'You must select an image';
		// 	return;
		// }

		// var mimeType = event.target.files[0].type;

		// if (mimeType.match(/image\/*/) == null) {
		// 	this.msg = "Only images are supported";
		// 	return;
		// }

		// var reader = new FileReader();
		// reader.readAsDataURL(event.target.files[0]);

		// reader.onload = (_event) => {
		// 	this.msg = "";
		// 	this.url = reader.result;
		// }
	}

  onChangeSignature(event: any): void {
    const file = event.target.files[0];
    this.employeeForm.baseForm.patchValue({
      signature: file
    });

  }
}

