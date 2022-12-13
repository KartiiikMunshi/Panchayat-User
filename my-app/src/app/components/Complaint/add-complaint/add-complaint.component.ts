import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-complaint',
  templateUrl: './add-complaint.component.html',
  styleUrls: ['./add-complaint.component.css']
})

export class AddComplaintComponent implements OnInit {
  previousImageSrc: string | undefined; // Used to store previous image
  deletePreviousImage: boolean | undefined = undefined; // Delete backend image on patch
  readonly photoMaxSize = 2 * 2 ** 20; // 2MB
  imageSrc: string | undefined; // Used to preview image
  itemForm!: FormGroup;
  categories: any[] = [];
  subCategories: any[] = [];
  // UserId:any = 1016;

  addComplaint = new FormGroup(({
    Title: new FormControl(''),
    Description: new FormControl(''),
    CategoryId: new FormControl(''),
    SubCategoryId: new FormControl(''),
    StatusId: new FormControl(1),
    CreatedBy: new FormControl(1015),
    AssignUserId: new FormControl(),
    ComplaintUserId: new FormControl(1015),
    BannerImageName: new FormControl(null),
    IsActive: new FormControl(1),
  }))

  constructor(private coreServices: CoreService, private location: Location) { }

  ngOnInit(): void {
    this.getCategoryList();
  }


  getCategoryList() {
    this.coreServices.getCategoryDDList().subscribe((result: any) => {
      console.log(result);
      this.categories = result;
    });
  }

  onCategoryChange(value: number) {
    console.log(value);
    this.coreServices.getSubCategoryDDList(value).subscribe((response: any) => {
      console.log(response);
      this.subCategories = response;
    });
  }

  onAddImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        // this.itemForm.patchValue({
        //   fileSource: reader.result,
        // });
      };
      this.deletePreviousImage = false;
    }
  }

  onRemoveImage() {
    this.imageSrc = this.previousImageSrc;
    this.deletePreviousImage = false;
  }

  reloadPage() {
    this.addComplaint.reset();
  }

  saveEvent(value: any) {
    this.coreServices.addComplaint(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }

  onBack() {
    this.location.back();
  }
}
