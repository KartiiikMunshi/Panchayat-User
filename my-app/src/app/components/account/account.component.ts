import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {


  previousImageSrc: string | undefined; // Used to store previous image
  deletePreviousImage: boolean | undefined = undefined; // Delete backend image on patch
  readonly photoMaxSize = 2 * 2 ** 20; // 2MB
  imageSrc: string | undefined; // Used to preview image
  itemForm!: FormGroup;
  UserId : any = 1;

  constructor(private coreServices: CoreService) { }

  accountForm = new FormGroup(({
    FirstName: new FormControl(''),
    Address: new FormControl(''),
    Phone : new FormControl (''),
  }))
  
  get f() { return this.accountForm.controls; }

  ngOnInit(): void {
    this.getUserId(this.UserId);
  }

  getUserId(value: any) {
    this.coreServices.getUserById(value).subscribe((res: any) => {
      this.accountForm.patchValue(res);
      // console.log(this.addCategory);
    });
  }

 
  reloadPage() {
    window.location.reload();
  }

  saveUser(value: any) {
    console.log(value);
  }
}
