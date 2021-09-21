import { takeUntil } from 'rxjs/operators';
import { PositionLevelService } from './../services/position-level.service';
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
import { DataTableDirective } from 'angular-datatables';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { NavigationExtras, Router } from '@angular/router';
import { PositionLevelResponse } from '@app/shared/models/base.interface';
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
  constructor(
    private router: Router,
    private positionlevelSvc: PositionLevelService,
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
        that.positionlevelSvc.getAll(dataTablesParameters).subscribe(resp => {
          that.dataRow = resp.data.data;
          callback({
            recordsTotal: resp.data.total,
            recordsFiltered: resp.data.total,
            data: []
          });
        });
      },
      columns: [
        { data: 'No' },
        { data: 'name_th' },
        { data: 'name_en' },
        { data: 'create_by' },
        { data: 'updated_at' },
        { data: 'created_at' },
        { data: 'update_by' },
        { data: 'action', orderable: false }
      ]
    };

  }

  onEdit(data): void {
    console.log(data);
    // return false
    const navigationExtras: NavigationExtras = {
      state: {
        item: {
          id: data.id,
          name: data.name,
          // company_id: data.company_id,
          // name_th: data.name_th,
          // name_en: data.name_en,
          role: '',
        }
      }
    };

    this.router.navigate(['base/position/edit'], navigationExtras);
  }

  onDelete(positionId: number): void {
    if (window.confirm('Do you really want remove this data')) {
      this.positionlevelSvc
        .delete(positionId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: PositionLevelResponse) => {
          if (res.code === 201) {
            this.rerender();
          }
        });
    }
  }
  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.ajax.reload();
    });
  }

}
