import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { AccountComponent } from './components/account/account.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddAddressComponent } from './components/add-address/add-address.component';
import { AddEventsComponent } from './components/Event/add-events/add-events.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { NgOtpInputModule } from  'ng-otp-input';
import { AddComplaintComponent } from './components/Complaint/add-complaint/add-complaint.component';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import {HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LogoutComponent } from './components/logout/logout.component';
import { EventDetailsComponent } from './components/Event/event-details/event-details.component';
import { ComplaintDetailsComponent } from './components/Complaint/complaint-details/complaint-details.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { ContactsComponent } from './components/contacts/contacts.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    AccountComponent,
    DashboardComponent,
    AddAddressComponent,
    AddEventsComponent,
    RegistrationComponent,
    UserLoginComponent,
    AddComplaintComponent,
    LogoutComponent,
    EventDetailsComponent,
    ComplaintDetailsComponent,
    ContactsComponent,
    UserDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    NgOtpInputModule,
    HttpClientModule,
    NgxSpinnerModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
   
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi : true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
