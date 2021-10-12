import { takeUntil } from 'rxjs/operators';
import { CooperativeMembersService } from '../services/cooperative-members.service';
import {
  AfterViewInit,
  Component,
  OnInit,
  Renderer2,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataTableDirective } from 'angular-datatables';
import { CooperativeMembersResponse } from '@app/shared/models/base.interface';
declare var $: any;
const user = JSON.parse(localStorage.getItem('user')) || null;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'role', 'username', 'actions'];
  dataSource = new MatTableDataSource();

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    }),
  };

  public dtOptions: DataTables.Settings = {};

  private destroy$ = new Subject<any>();
  public dataRow: any[];

  @ViewChild(DataTableDirective)
  dtElement!: DataTableDirective;

  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private router: Router,
    private CooperativeMembersSvc: CooperativeMembersService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private http: HttpClient
  ) { }

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

  loadTable(): void {
    const that = this;

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        that.CooperativeMembersSvc.getAll(dataTablesParameters).subscribe((resp) => {
          that.dataRow = resp.data.data;
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: [],
          });
        });
      },
      columns: [
        { data: 'id' },
        { data: 'person_id' },
        // { data: 'member_id' },
        { data: 'type' },
        { data: 'status' },
        { data: 'share_qty' },
        { data: 'share_amount' },
        { data: 'sum_share_qty'},
        { data: 'sum_share_amount' },
        { data: 'share_pay' },
        { data: 'action', orderable: false },
      ],
    };
  }

  onEdit(data): void {
    console.log(data);
    // return ;
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          create_by: data.create_by,
          member_date: data.member_date, //เป็นสมาชิกวันที่
          member_id: data.member_id, //รหัสสมาชิก
          // member_doc:data.member_doc,
          person: data.person.name,//ชื่อพนักงาน
          person_id: data.person_id,//รหัสพนักงาน
          // reason: data.reason,
          // resign_doc: data.resign_doc,
          // resign_id: data.resign_id,
          share_amount: data.share_amount, //จำนวนหุ้นสะสม
          // share_doc: data.share_doc,
          share_pay: data.share_pay,  //สถานะชำระหุ้น
          share_qty: data.share_qty, //จำนวนหุ้นรายเดือน
          status: data.status, //สถานะ
          sum_share_amount: data.sum_share_amount, //มูลค่าหุ้นสะสม
          sum_share_qty: data.sum_share_qty, //ส่วนแบ่งคุณภาพ
          type: data.type, //ประเภท as member
          update_by: data.update_by,
          updated_at: data.updated_at,
          role: '',
        },
      },
    };

    this.router.navigate(['managecooperative/cooperative-members/edit'], navigationExtras);
  }

  onDelete(loantypeId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.CooperativeMembersSvc
        .delete(loantypeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: CooperativeMembersResponse) => {
          // if (res.code === 201) {
          this.rerender();
          // }
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
