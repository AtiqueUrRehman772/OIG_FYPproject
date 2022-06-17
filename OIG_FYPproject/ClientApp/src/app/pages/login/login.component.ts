import { LoginUserService } from '../services/login/loginUser.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userLogin: LoginUserService, private router: Router) { }
  ngOnInit() {
    setTimeout(() => {
      this.showLoader = false;
    }, 750);
  }

  loginForm = new FormGroup({
    password: new FormControl("",Validators.required),
    email: new FormControl("",Validators.required),
  });
  showLoader: boolean = true;
  result: any = { userName: "", email: "", password: "" };
  loginUser() {
    this.userLogin
      .loginUser(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .subscribe(
        data => {
          this.result = data;
          console.log(data);
          if (this.result.userName == "admin") {
            sessionStorage.setItem('Id',this.loginForm.value.email);
            this.router.navigateByUrl("/adminDashboard");
          }
          else if (this.result.userName == "advisor") {
            sessionStorage.setItem('Id',this.loginForm.value.email);
            this.router.navigateByUrl("/advisorHomePage");
          }
          else if (this.result.userName == "investor") {
            sessionStorage.setItem('Id',this.loginForm.value.email);
            this.router.navigateByUrl("/investorHomePage");
          }
          else if (this.result.userName == "owner") {
            sessionStorage.setItem('Id',this.loginForm.value.email);
            this.router.navigateByUrl("/bussinessOwnerHomepage");
          }
          else {
            Swal.fire(
              'Login Failed',
              'Invalid Credentials !',
              'error'
            )
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
