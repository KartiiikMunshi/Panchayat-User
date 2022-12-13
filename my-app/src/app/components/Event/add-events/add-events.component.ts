import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})

export class AddEventsComponent implements OnInit {
  previousImageSrc: string | undefined; // Used to store previous image
  deletePreviousImage: boolean | undefined = undefined; // Delete backend image on patch
  readonly photoMaxSize = 2 * 2 ** 20; // 2MB
  imageSrc: string | undefined; // Used to preview image
  itemForm!: FormGroup;
  today = new Date();
  UserId : any = 4;

  addEvent = new FormGroup(({
    Title: new FormControl(''),
    Description: new FormControl(''),
    StartDate: new FormControl(''),
    EndDate: new FormControl(''),
    BannerImageName: new FormControl(null),
    // StateId: new FormControl(1),
    // DistrictId: new FormControl(1),
    // BlockId: new FormControl(1),
    // PanchayatId: new FormControl(1),
    Publish: new FormControl(true),
    Interested : new FormControl(true),
    Attendee: new FormControl(3),
    IsActive: new FormControl(true),
    CreatedBy: new FormControl(this.UserId),
    CreatedDate: new FormControl(this.today),
    ModifiedBy: new FormControl(this.UserId),
    ModifiedDate: new FormControl(this.today),
  }))

  constructor(private coreServices: CoreService, private location: Location) { }

  ngOnInit(): void { }

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
    this.addEvent.reset();
  }

  saveEvent(value: any) {
    this.coreServices.addEvent(value).subscribe((result: any) => {
      console.log(result);
    });
    console.log(value);
  }

  onBack() {
    this.location.back();
  }
}
