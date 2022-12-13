import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintDetailsComponent } from '../Complaint/complaint-details/complaint-details.component';
import { AddComplaintComponent } from '../Complaint/add-complaint/add-complaint.component';
import { AddEventsComponent } from '../Event/add-events/add-events.component';
import { EventDetailsComponent } from '../Event/event-details/event-details.component';
import { MainComponent } from './main.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path : 'main',
    children :[
      {
        path : '',
        component : MainComponent
      },
      {
        path : 'add-complaint',
        component : AddComplaintComponent
      },
      {
        path : 'add-event',
        component : AddEventsComponent
      },
      {
        path :'event-details/:Id',
        component : EventDetailsComponent
      },
      {
        path : 'complaint-details/:Id',
        component : ComplaintDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
