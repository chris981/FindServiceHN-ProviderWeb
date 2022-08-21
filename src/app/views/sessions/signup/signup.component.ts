import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedAnimations } from 'src/app/shared/animations/shared-animations';
import { UserModel } from 'src/app/shared/models/user-model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [SharedAnimations]
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
      private authService: AuthService,
      private router: Router) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
   }

  ngOnInit() {
  }

  async Save() {
    if(this.signUpForm.valid){
      const user: UserModel = {
        name: this.signUpForm.value?.name,
        lastName: this.signUpForm.value?.lastName,
        userName: this.signUpForm.value?.userName,
        email: this.signUpForm.value?.email,
        password: this.signUpForm.value?.password,
      };

      let result = (await this.authService.signUp(user).toPromise())
      if(result){
        this.authService.signin(result.email, user.password)
          .subscribe({next: (resp) => {
            this.router.navigateByUrl('/dashboard');
          }});
      }
    }
  }
}
