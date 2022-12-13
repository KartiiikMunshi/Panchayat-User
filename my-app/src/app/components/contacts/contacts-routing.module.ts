import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ContactsComponent } from './contacts.component';

const routes: Routes = [
  { path: '', redirectTo: 'contact', pathMatch: 'full' },
  {
    path : 'contact',
    // component : ContactsComponent,
    children :[
      {
        path : '',
        component : ContactsComponent
      },
      { path :'user-details/:Id', component : UserDetailsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
