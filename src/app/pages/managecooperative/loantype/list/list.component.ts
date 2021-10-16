import { takeUntil } from 'rxjs/operators';
import { LoantypeService } from '../services/loantype.service';
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
    private LoantypeSvc: LoantypeService,
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
        that.LoantypeSvc.getAll(dataTablesParameters).subscribe((resp) => {
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
        { data: 'name' },
        { data: 'description' },
        { data: 'abbreviation' },
        { data: 'interest_rate' },
        { data: 'member_age' },
        { data: 'supporter_age' },
        { data: 'share' },
        { data: 'supporter' },
        { data: 'property' },
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
          name: data.name,
          description: data.description,
          abbreviation: data.abbreviation,
          interest_rate: data.interest_rate,
          member_age: data.member_age,
          supporter_age: data.supporter_age,
          share: data.share,
          supporter: data.supporter,
          property: data.property,
          // sup_num: data.sup_num,
          // share_limit: data.share_limit,
          // share_time: data.share_time,
          // share_doc: data.share_doc,
          // share_process: data.share_process,
          // supporter_limit: data.supporter_limit,
          // supporter_time: data.supporter_time,
          // supporter_doc: data.supporter_doc,
          // supporter_process: data.supporter_process,
          // property_limit: data.property_limit,
          // property_time: data.property_time,
          // property_doc: data.property_doc,
          // property_process: data.property_process,
          // objective: data.objective,
          // remark: data.remark,

          role: '',
        },
      },
    };

    this.router.navigate(['managecooperative/loantype/edit'], navigationExtras);
  }

  onDelete(loantypeId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.LoantypeSvc
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
