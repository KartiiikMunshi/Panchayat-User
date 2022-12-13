import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  today = new Date();
  states: any[] = [];
  districts: any[] = [];
  blocks: any[] = [];
  panchayats : any[] = [];

  constructor(private coreServices : CoreService,private router: Router) { }
  
  addWard = new FormGroup (({
    Name: new FormControl(''),
    Hi_Name: new FormControl(''),
    BlockId :new FormControl(),
    DistrictId: new FormControl(''),
    PanchayatId: new FormControl(),
    StateId: new FormControl(''),
    WardNo: new FormControl(''),
    address: new FormControl(''),
    // Name: new FormControl('', Validators.required),
    // Hi_Name: new FormControl('', Validators.required),
    // BlockId :new FormControl('', Validators.required),
    // DistrictId: new FormControl('', Validators.required),
    // PanchayatId: new FormControl('', Validators.required),
    // StateId: new FormControl('', Validators.required),
    // WardNo: new FormControl('', Validators.required),
    // address: new FormControl('', Validators.required),
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
    this.router.navigate(['home']);
    console.log(value);
  }
}
