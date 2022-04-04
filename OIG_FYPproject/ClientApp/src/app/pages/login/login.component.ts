import { LoginUserService } from '../services/login/loginUser.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private userLogin: LoginUserService,private router:Router) {  }


  ngOnInit() {
  }

  loginForm = new FormGroup({
    password: new FormControl(""),
    email: new FormControl(""),
  });
result:any = {userName:"",email:"",password:""};
  loginUser() {
    this.result = this.userLogin
      .loginUser(
        this.loginForm.value.email,
        this.loginForm.value.password
      )
      .subscribe(
        data => {
          this.result = data;
          if(this.result.userName == "admin"){
            this.router.navigateByUrl("/adminDashboard");
          }
          else if(this.result.userName == "advisor"){
            this.router.navigateByUrl("/advisorHomePage");
          }
          else if(this.result.userName == "investor"){
            this.router.navigateByUrl("/investorHomePage");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
