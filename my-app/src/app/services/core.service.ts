import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  getUserById( UserId : number ){
    return this.http.get('http://localhost:3333/users/' + UserId );
  }

  getEventbyUserId( UserId : number ){
    return this.http.get('http://localhost:3333/allEvents/' + UserId );
  }

  getAllComplaintByUserId( UserId : number ){
    return this.http.get('http://localhost:3333/allComplaints/' + UserId );
  }

  getMyComplaintByUserId( UserId : number ){
    return this.http.get('http://localhost:3333/myComplaints/' + UserId );
  }

  getEventByEventId( EventId : number ){
    return this.http.get('http://localhost:3333/events/' + EventId );
  }

  addEvent(data : any){
    return this.http.post('http://localhost:3333/addEvent', data);
  }

  addComplaint(data : any){
    return this.http.post('http://localhost:3333/addComplaint', data);
  }

  getComplaintByComplaintsId( ComplaintsId : number ){
    return this.http.get('http://localhost:3333/complaints/' + ComplaintsId );
  }

  getCategoryDDList(){
    return this.http.get('http://localhost:3333/categoryDDList');
  }

  getSubCategoryDDList( CategoryId : number ){
    return this.http.get('http://localhost:3333/subCategoryDDList/ ' + CategoryId);
  }

  getStatus(){
    return this.http.get('http://localhost:3333/GetStatusList');
  }

  getContacts(){
    return this.http.get('http://localhost:3333/userList');
  }
}
