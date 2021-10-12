import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from './../services/employee.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { EmployeeResponse } from '@app/shared/models/base.interface';
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders } from '@angular/common/http';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };
  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(private router: Router,
    private employeeSvc: EmployeeService,
    private elementRef: ElementRef,
    private renderer: Renderer2) { }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.loadTable();
  }


  //   this.employeeSvc.getAll().subscribe((employee) => {
  //     this.dataRow = employee.data;

  //     const script = this.renderer.createElement('script');
  //     script.src = 'assets/plugins/datatable/js/dataTables.buttons.min.js';
  //     script.onload = () => {
  //       console.log('script loaded');
  //       const table = $('#example').DataTable({
  //         // dom: 'lBfrtiBp',
  //         lengthChange: true,
  //         buttons: ['copy', 'excel', 'pdf', 'colvis'],
  //         responsive: true,
  //         language: {
  //           searchPlaceholder: 'Search...',
  //           sSearch: '',
  //           lengthMenu: '_MENU_ ',
  //         }
  //       });
  //       table.buttons().container()
  //         .appendTo('#example_wrapper .col-md-6:eq(0)');

  //     };
  //     this.renderer.appendChild(this.elementRef.nativeElement, script);
  //     // this.dataSource.data = company;
  //   });
  // }

  loadTable(): void {

    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.employeeSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          // console.log(this.dataRow);
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'id' },
        // { data: 'person_id' },
        // { data: 'prefix_id' },
        // { data: 'company_id' },
        { data: 'branch_id' },
        // { data: 'division_id.name_th' },
        { data: 'department_id' },
        { data: 'position_id' },
        // { data: 'person_type_id.name_th' },
        // { data: 'position_group_id.name_th' },
        // { data: 'position_type_id.name_th' },
        // { data: 'position_level_id.name_th' },
        // { data: 'card_id' },
        { data: 'name' },
        // { data: 'name_en' },
        { data: 'status' },
        // { data: 'work' },
        // { data: 'sex' },
        // { data: 'position_number' },
        // { data: 'id_card' },
        // { data: 'email' },
        { data: 'photo' },
        // { data: 'phone' },
        // { data: 'birthday' },
        // { data: 'start_work_date' },
        // { data: 'pass_testing_date' },
        // { data: 'retire_date' },
        // { data: 'disable_date' },
        // { data: 'resign_date' },
        // { data: 'resign_id' },
        // { data: 'create_by' },
        // { data: 'update_by' },
        // { data: 'created_at' },
        // { data: 'updated_at' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {
    console.log('success');
    // return false
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          user_id: data.user_id,
          name: data.name,
          email: data.email,
          password: '',
          confirm_password: '',
          image_url: data.image,
          image: '',
          signature: '',
          signature_url: data.signature,
          branch_id: data.branch_id,
          permission_id: data.permission_id,
          department_id: data.department_id,
          position_id: data.position_id,
          status: data.status,
          line_token: data.line_token
          // company_id: data.company_id,
          // name_th: data.name_th,
          // name_en: data.name_en,
          // role: '',
        }
      }
    };

    this.router.navigate(['base/employee/edit'], navigationExtras);
  }

  onDelete(employeeId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.employeeSvc
        .delete(employeeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: EmployeeResponse) => {
          if (res.code === 201) {
            this.rerender();
          }
          // this.branchSvc.getAll().subscribe((branch) => {
          // this.dataRow = branch.data;
          // });
        });
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
