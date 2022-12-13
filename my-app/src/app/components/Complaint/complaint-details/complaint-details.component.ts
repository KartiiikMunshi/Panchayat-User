import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.css']
})
export class ComplaintDetailsComponent implements OnInit {
  ComplaintsId: any;
  Title: any;
  Type: any;
  Status: any;
  Ward: any;
  Name: any;
  Date: any;
  Comment: any;
  categories: any[] = [];
  subCategories: any[] = [];
  CategoryId: any[] = [];
  Statu : any[] = [];
  SubCategoryId: any;

  constructor(private coreServices: CoreService, private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ComplaintsId = params['Id'];
      console.log("ID : " + this.ComplaintsId);
      this.getComplaintByComplaintsId(this.ComplaintsId);
    });
    this.getCategoryList();
    this.getStatusList();
  }

  updateComplaintForm = new FormGroup(({
    CategoryId: new FormControl(),
    SubCategoryId: new FormControl(),
    StatusId : new FormControl(),
  })
  );

  getCategoryList() {
    this.coreServices.getCategoryDDList().subscribe((result: any) => {
      console.log(result);
      this.categories = result;
    });
  }

  updateComplaint(updateComplaint: any) {
    let ComplaintData: any = {};

    ComplaintData.ComplaintsId = parseInt(this.ComplaintsId);
    // wardData.Name = this.addWard.value.Name;
    // wardData.Hi_Name = this.addWard.value.Hi_Name;
    // wardData.WardNo = this.addWard.value.WardNo;
    // wardData.StateId = this.addWard.value.StateId;
    // wardData.DistrictId = this.addWard.value.DistrictId;
    ComplaintData.CategoryId = this.updateComplaintForm.value.CategoryId;
    ComplaintData.SubCategoryId = this.updateComplaintForm.value.SubCategoryId;
  

    // this.coreServices.updateComplaint(ComplaintData).subscribe((result: any) => {
    // console.log("Result:" + this.ComplaintsId + result);
    this.location.back();
    // });
    // console.log("UPDATE FORM" + value); 
  }

  onCategoryChange(value: number) {
    console.log(value);
    this.coreServices.getSubCategoryDDList(value).subscribe((response: any) => {
      console.log(response);
      this.subCategories = response;
    });
  }

  reloadPage() {
    this.location.back();
  }

  getStatusList(){
    this.coreServices.getStatus().subscribe((res : any) =>{
       this.Statu = res;
    })
  }

  getComplaintByComplaintsId(value: any) {
    this.coreServices.getComplaintByComplaintsId(value).subscribe((res: any) => {
      console.log(res);


      this.updateComplaintForm.patchValue(res);
      // this.onCategoryChange(value);
      // this.updateComplaintForm.value.SubCategoryId.patchValue(res.TblSubCategories.SubCategoryId);
      this.Title = res.Title;
      this.Type = res.TblCategories.En_Name;
      this.Status = res.TblStatu.En_Name;
      this.Ward = res.ComplaintUser.WardId;
      this.Name = res.ComplaintUser.FirstName + " " + res.ComplaintUser.LastName;
      this.Comment = res.Comment;
      this.Date = res.CreatedDate;
      // this.categories = res.TblCategories.En_Name;
      // wardData.PanchayatId = res.value.SubCategoryId;
    });
  }
}
