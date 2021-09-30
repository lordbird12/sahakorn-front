import { map, takeUntil } from 'rxjs/operators';
import { CooperativeService } from '../services/cooperative.service';
import { FormGroup } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseFormCooperative } from '@shared/utils/base-form-cooperative';
import { Observable, Subscription } from 'rxjs';
import { CooperativeResponse } from '@app/shared/models/base.interface';
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

  actionTODO = Action.EDIT;
  showPasswordField = true;
  hide = true;
  private subscription: Subscription = new Subscription();
  state: Observable<CooperativeResponse>;
  public Cooperativedata: any = [];
  // imageDeleteFrom: FormGroup;
  // imageurls =[];
  // base64String: string;
  // name: string;
  // imagePath: string;

  url: any; //Angular 11, for stricter type
	msg = "";


  constructor(
    private cooperativeSvc: CooperativeService,
    private router: Router,
    public cooperativeForm: BaseFormCooperative,
    public activatedRoute: ActivatedRoute,


  ) { }
  // removeImageEdit(i, imagepath) {
  //   this.imageDeleteFrom.value.id = i;
  //   this.imageDeleteFrom.value.ImagePath = imagepath;
  // }

  // removeImage(i) {
  //   this.imageurls.splice(i, 1);
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    // console.log('test');
  }

  ngOnInit(): void {
    this.GetInformation();


    // this.cooperativeForm.baseForm.get('role').setValidators(null);
    // this.cooperativeForm.baseForm.get('role').updateValueAndValidity();
  }


  GetInformation(): void {
    this.cooperativeSvc.getById(1).subscribe((resp) => {
      this.Cooperativedata = resp;
      // this.ProfileName = this.ProfileData.name;
      // this.ProfileDepName = this.ProfileData.department.name;
      // this.ProfileBranch = this.ProfileData.branch.name;
      // this.ProfilePosition = this.ProfileData.position.name;
      // this.ProfileLineToken = this.ProfileData.line_token;
      console.log(this.Cooperativedata.data);
      // alert(this.Cooperativedata.data.account_name);
      this.cooperativeForm.baseForm.patchValue({
        cooperative_id: this.Cooperativedata.data.id,
        account_name: this.Cooperativedata.data.account_name,
        cooperative_no: this.Cooperativedata.data.cooperative_no,
        bank_name: this.Cooperativedata.data.bank_name,
        name: this.Cooperativedata.data.name,
        start_date: this.Cooperativedata.data.start_date,
        type: this.Cooperativedata.data.type,
        tax_id: this.Cooperativedata.data.tax_id,
        bank_batch: this.Cooperativedata.data.bank_batch,
        bank_id: this.Cooperativedata.data.bank_id,
        road: this.Cooperativedata.data.road,
        district: this.Cooperativedata.data.district,
        sub_district: this.Cooperativedata.data.sub_district,
        province_id: this.Cooperativedata.data.province.id,
        zipcode: this.Cooperativedata.data.zipcode,
        phone: this.Cooperativedata.data.phone,
        fax: this.Cooperativedata.data.fax,
        village: this.Cooperativedata.data.village,
        address: this.Cooperativedata.data.address,
        // logo: this.Cooperativedata.data.logo,
        // map: this.Cooperativedata.data.map,


      });
      // this.cooperativeForm.baseForm.setValue(this.Cooperativedata.data);

    });
  }

  onAdd(): void {
    if (this.cooperativeForm.baseForm.invalid) {
      return;

    }
    const formValue = this.cooperativeForm.baseForm.value;
    console.log(formValue);

    if (this.actionTODO === Action.EDIT) {
      this.cooperativeSvc.update(formValue.id,formValue).subscribe((res) => {
        this.router.navigate(['managecooperative/cooperative/form']);
      });
      alert("บันทึกข้อมูลสำเร็จ");
    }


  }
  selectFile(event: any) { //Angular 11, for stricter type
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}

		var mimeType = event.target.files[0].type;

		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}

		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);

		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result;
		}
	}
  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var filesAmount = event.target.files.length;
  //     for (let i = 0; i < filesAmount; i++) {
  //       var reader = new FileReader();
  //       reader.onload = (event: any) => {
  //         this.imageurls.push({ base64String: event.target.result, });
  //       }
  //       reader.readAsDataURL(event.target.files[i]);
  //     }
  //   }
  // }


}
