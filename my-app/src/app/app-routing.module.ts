import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { EventDetailsComponent } from './components/Event/event-details/event-details.component';
import { ContactsComponent } from './components/contacts/contacts.component';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    data: { title: 'First Component' },
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: AppComponent,
    data: { title: 'main Component' },
    children: [{ path: '', component: UserLoginComponent }],
  },

  { path: 'logout', component: LogoutComponent },

  { path: 'registration', component: RegistrationComponent },

  {
    path: 'home',
    component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      // { path : 'add-event',component : AddEventsComponent },
      {  path : 'event-details',component : EventDetailsComponent },
      
      { path :'contacts',
      //  component : ContactsComponent 
      loadChildren: () => import('../app/components/contacts/contacts.module')
          .then(m => m.ContactsModule)
      },
      
      {
        path: '',
        loadChildren: () => import('../app/components/main/main-routing.module')
          .then(m => m.MainRoutingModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
