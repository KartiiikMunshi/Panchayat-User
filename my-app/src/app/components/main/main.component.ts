import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ComplaintList } from 'src/app/models/complaint-list';
import { EventList } from 'src/app/models/event-list';
import { CoreService } from 'src/app/services/core.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class MainComponent implements OnInit {
  UserId: any = 4;
  pageIndex: any = 0;
  EventList: any = [];
  ComplaintList: any = [];

  displayedColumnsSmallMobComplaint: string[] = ['Title', 'Img'];
  displayedColumnsComplaint: string[] = ['complaintName', 'category', 'subCategory', 'status', 'ward', 'Name', 'Date'];
  displayedColumnsSmallMob: string[] = ['Title', 'img'];
  displayedColumns: string[] = ['Title', 'CreatedBy', 'CreatedDate', 'PostedBy'];

  @ViewChild('sorter1') sorter1!: MatSort;
  @ViewChild('sorter2') sorter2!: MatSort;
  @ViewChild('sorter3') sorter3!: MatSort;
  @ViewChild('sorter4') sorter4!: MatSort;
  @ViewChild('sorter5') sorter5!: MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild('MatPaginator1') paginator1: any = MatPaginator;
  @ViewChild('MatPaginator2') paginator2: any = MatPaginator;
  @ViewChild('MatPaginator3') paginator3: any = MatPaginator;
  @ViewChild('MatPaginator4') paginator4: any = MatPaginator;
  @ViewChild('MatPaginator5') paginator5: any = MatPaginator;
  @ViewChild('scheduledOrdersPaginator') paginators !: MatPaginator;
  @ViewChild('scheduledOrdersPaginator1') paginators1 !: MatPaginator;
  @ViewChild('scheduledOrdersPaginator2') paginators2 !: MatPaginator;
  @ViewChild('scheduledOrdersPaginator3') paginators3 !: MatPaginator;
  @ViewChild('scheduledOrdersPaginator4') paginators4 !: MatPaginator;
  @ViewChild('scheduledOrdersPaginator5') paginators5 !: MatPaginator;

  dataSource = new MatTableDataSource<EventList[]>(this.EventList);
  dataSourceSmall = new MatTableDataSource<EventList[]>(this.EventList);

  newDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  newDataSourceSmall = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);

  processDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  processDataSourceSmall = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);

  holdDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  holdDataSourceSmall = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);

  completedDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  completedDataSourceSmall = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);

  myComplaintDataSource = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);
  myComplaintDataSourceSmall = new MatTableDataSource<ComplaintList[]>(this.ComplaintList);

  constructor(private coreServices: CoreService, private SpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this.SpinnerService.show();
    this.getEventById(this.UserId);
    this.getAllComplaintByUserId(this.UserId);
    this.getMyComplaintByUserId(this.UserId);
  }

  getEventById(value: any) {
    this.coreServices.getEventbyUserId(value).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSourceSmall = new MatTableDataSource(response);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSourceSmall.paginator = this.paginators;
      })
    });
  }

  getAllComplaintByUserId(value: any) {
    this.coreServices.getAllComplaintByUserId(value).subscribe((response: any) => {

      const filteredNewData = response.filter((d: any) => d.StatusId === 1);
      this.newDataSource = new MatTableDataSource(filteredNewData);
      this.newDataSourceSmall = new MatTableDataSource(filteredNewData);

      const filteredInProcessData = response.filter((d: any) => d.StatusId === 2);
      this.processDataSource = new MatTableDataSource(filteredInProcessData);
      this.processDataSourceSmall = new MatTableDataSource(filteredInProcessData);

      const filteredHoldData = response.filter((d: any) => d.StatusId === 3);
      this.holdDataSource = new MatTableDataSource(filteredHoldData);
      this.holdDataSourceSmall = new MatTableDataSource(filteredHoldData);

      const filteredCompletedData = response.filter((d: any) => d.StatusId === 4);
      this.completedDataSource = new MatTableDataSource(filteredCompletedData);
      this.completedDataSourceSmall = new MatTableDataSource(filteredCompletedData);

      this.SpinnerService.hide();
      setTimeout(() => {
        this.newDataSource.sort = this.sorter1;
        this.processDataSource.sort = this.sorter2;
        this.holdDataSource.sort = this.sorter3;
        this.completedDataSource.sort = this.sorter4;
        this.newDataSource.paginator = this.paginator1;
        this.processDataSource.paginator = this.paginator2;
        this.holdDataSource.paginator = this.paginator3;
        this.completedDataSource.paginator = this.paginator4;
        this.newDataSourceSmall.paginator = this.paginators1;
        this.processDataSourceSmall.paginator = this.paginators2;
        this.holdDataSourceSmall.paginator = this.paginators3;
        this.completedDataSourceSmall.paginator = this.paginators4;
      })
    });
  }

  getMyComplaintByUserId(value: any) {
    this.coreServices.getMyComplaintByUserId(value).subscribe((response: any) => {
      console.log(response);

      this.myComplaintDataSource = new MatTableDataSource(response);
      setTimeout(() => {
        this.myComplaintDataSource.sort = this.sorter5;
        this.myComplaintDataSource.paginator = this.paginator5;
        this.myComplaintDataSourceSmall.paginator = this.paginators5;
      })
    });
  }

  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
 
  // @Input() isSearch;
  
  isSearch : boolean = false;

  searchOpens(){
    this.isSearch = true;
  }

  fireFilterEvent(event: Event) {
    console.log("Welcome Main page from home");
    const input = (event.target as HTMLInputElement).value;
    this.applyFilter(input);
  }

  applyFilter(filterValue: string) {
    console.log("filter start from home");
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSourceSmall.filter = filterValue.trim().toLowerCase();
    this.newDataSource.filter = filterValue.trim().toLowerCase();
    this.newDataSourceSmall.filter = filterValue.trim().toLowerCase();
    this.processDataSource.filter = filterValue.trim().toLowerCase();
    this.processDataSourceSmall.filter = filterValue.trim().toLowerCase();
    this.holdDataSource.filter = filterValue.trim().toLowerCase();
    this.holdDataSourceSmall.filter = filterValue.trim().toLowerCase();
    this.myComplaintDataSource.filter = filterValue.trim().toLowerCase();
    this.myComplaintDataSourceSmall.filter = filterValue.trim().toLowerCase();
    this.completedDataSource.filter = filterValue.trim().toLowerCase();
    this.completedDataSourceSmall.filter = filterValue.trim().toLowerCase();
  }
}
