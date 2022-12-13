import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  today = new Date();
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  panchayats : any[] = [];

  constructor(private coreServices : CoreService) { }
  
  addWard = new FormGroup (({
    Name: new FormControl('', Validators.required),
    Hi_Name: new FormControl('', Validators.required),
    BlockId :new FormControl('', Validators.required),
    DistrictId: new FormControl('', Validators.required),
    PanchayatId: new FormControl('', Validators.required),
    StateId: new FormControl('', Validators.required),
    WardNo: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(3),
    CreatedDate: new FormControl(this.today),   
    ModifiedBy : new FormControl(3),
    ModifiedDate : new FormControl(this.today),
  }))

  ngOnInit(): void {
    
  }

 
  reloadPage(){
   this.addWard.reset();
  }

  saveWard(value : any) {
    console.log(value);
  }
}
