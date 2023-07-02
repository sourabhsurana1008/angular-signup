import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/validationform';
import { Router } from '@angular/router';
import { PasswordValidators } from "./../../password-validators";



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signUpForm!: FormGroup;
  type: string = 'password';
  isText: boolean = false;
  eyeIcon:string = "fa-eye-slash"
  constructor(private fb : FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8)]]
    }, {
      validators: [PasswordValidators]
    }
    )
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = 'fa-eye' : this.eyeIcon = 'fa-eye-slash'
    this.isText ? this.type = 'text' : this.type = 'password'
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      let signUpObj = {
        ...this.signUpForm.value,
      }
      this.auth.getUserImage(signUpObj.lastName.length).subscribe(response => { 
         if( response.thumbnailUrl) {
            signUpObj['thumbnailUrl'] = response.thumbnailUrl;
            delete signUpObj.password;
            this.auth.signUp(signUpObj)
            .subscribe({
              next:(res=>{
                alert('Success, Thank you for your registration' );
                this.signUpForm.reset();
              }),
              error:(err=>{
                alert(`Error, ${err?.error?.message}`);
              })
            })
         } 
      }, err=> {
          alert(`Thumbnail Error, ${err?.error?.message}`);
      })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm); 
    }
  }
}