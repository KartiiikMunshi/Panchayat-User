import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  UserId: any;
  Name: any;
  WardId: any;
  PanchayatId: any;
  Mobile: any;

  constructor(private coreServices: CoreService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.UserId = params['Id'];
      console.log("ID : " + this.UserId);
      this.getUserByUserId(this.UserId);
    });
  }

  reloadPage() {
    this.location.back();
  }

  getUserByUserId(value: any) {
    this.coreServices.getUserById(value).subscribe((res: any) => {
      this.Name = res.FirstName +" "+ res.LastName;
      this.PanchayatId = res.TblPanchayat.Name;
      this.WardId = res.WardId;
      this.Mobile = res.Phone;
    });
  }
}
