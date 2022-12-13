import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  email!: string;
  password!: string;
  token!: string;
  formData: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.formData = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void { }

  onClickSubmit() {
    const val = this.formData.value;

    if (val.email && val.password) {

      this.authService.login(val.email, val.password, val.token)
        .subscribe(
          (data: any) => {
            // console.log("User is logged in" + this.email + this.password + this.token);
            // localStorage.setItem("Token", this.token);
            if (data) {
              this.email = data.email;
              this.password = data.password;
              this.token = data.token;
              this.router.navigate(['/home']);
            }
            else {
              // this.simpleAlert();
            }
          }
        );
    }
    if (val.email == '' || val.password == '') {
      // this.simpleAlert();
    }
  }


  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: ['', Validators.required],
  // });
  // secondFormGroup = this._formBuilder.group({
  //   secondCtrl: [null, Validators.required],
  // });

  // constructor(private _formBuilder: FormBuilder) {}

  // ngOnInit(): void {
  // }

  // onEnterMob (value : any){
  //    console.log(value);     
  // }
  // onOtpChange(event : any){

  // }

}