import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'src/app/services/core.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UserList } from 'src/app/models/user-list';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  UserList : any[] = [];
  pageIndex: any= 0;
  displayedColumnsSmallMob: string[] = ['Name','img'];
  displayedColumns: string[] = ['Name','WardId','PanchayatId','Mobile'];

  dataSource = new MatTableDataSource<UserList[]>(this.UserList);
  dataSourceSmall = new MatTableDataSource<UserList[]>(this.UserList);
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  @ViewChild('scheduledOrdersPaginator') paginators !: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;


  constructor(private coreServices : CoreService) { }

  ngOnInit(): void {
    this.getUserContact();
  }


  getUserContact(){
    this.coreServices.getContacts().subscribe((response: any) => {
      // const filteredNewData = response.filter((d: any) => d.StatusId === 1);
      this.dataSource = new MatTableDataSource(response);
      this.dataSourceSmall = new MatTableDataSource(response);

      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSourceSmall.paginator = this.paginators;
      })
    });

  }
  onPaginateChange(event: any) {
    this.pageIndex = event.pageIndex;
    localStorage.setItem('', JSON.stringify(this.pageIndex));
  }
}
