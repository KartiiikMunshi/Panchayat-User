import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
  EventId: any;
  Title: any;
  CreatedBy: any;
  startdDate: any;
  endDate: any;
  Panchayat : any;
  Description : any;

  constructor(private coreServices: CoreService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.EventId = params['Id'];
      console.log("ID : " + this.EventId);
      this.getEventByEventId(this.EventId);
    });
  }

  reloadPage() {
    this.location.back();
  }

  getEventByEventId(value: any) {
    this.coreServices.getEventByEventId(value).subscribe((res: any) => {
      this.Title = res.Title;
      this.CreatedBy = res.CreatedBy;
      this.Panchayat = res.TblPanchayat.Name;
      this.startdDate = res.StartDate;
      this.endDate = res.EndDate;
      this.Description = res.Description;
    });
  }
}
