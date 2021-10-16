import { takeUntil } from 'rxjs/operators';
import { CooperativeBoardService } from '../services/cooperative-board.service';
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
import { LoantypeResponse } from '@app/shared/models/base.interface';
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
    private CooperativeBoardSvc: CooperativeBoardService,
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
        that.CooperativeBoardSvc.getAll(dataTablesParameters).subscribe((resp) => {
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
        { data: 'account_year_id' },
        { data: 'status' },
        { data: 'position' },
        { data: 'member_id' },
        { data: 'start_date' },
        { data: 'end_date' },
        { data: 'term' },
        { data: 'year' },
        { data: 'phase' },
        // { data: 'resign_id' },
        // { data: 'create_by' },
        // { data: 'update_by' },
        // { data: 'created_at' },
        // { data: 'updated_at' },
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
          account_year_id: data.account_year_id,
          member_id: data.member_id,
          position: data.position,
          start_date: data.start_date,
          end_date: data.end_date,
          term: data.term,
          year: data.year,
          phase: data.phase,
          status: data.status,
          role: '',
        },
      },
    };

    this.router.navigate(['managecooperative/cooperative-board/edit'], navigationExtras);
  }

  onDelete(loantypeId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.CooperativeBoardSvc
        .delete(loantypeId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: LoantypeResponse) => {
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
