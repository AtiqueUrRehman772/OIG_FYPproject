import { Component, OnInit } from "@angular/core";
import { UserRegisterService } from "../services/register/userRegister.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  constructor(private userRegister: UserRegisterService, private router: Router) { }
  ngOnInit() {
    setTimeout(() => {
      this.showLoader = false;
    }, 550);
  }
  //////////  ----   Reactive Form (Register)   ----  //////////
  registerForm = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
    userType: new FormControl(""),
    country: new FormControl("")
  });
  accountType:any = ["Business Owner","Investor","Advisor"];
  countries:any = ["Pakistan","Turkey","China","Saudi Arabia","Qatar","England","Germany"];
  showLoader: boolean = true;
  result: boolean;
  registerUser() {
    //console.warn(this.registerForm.value);
    this.userRegister
      .registerUser(
        this.registerForm.value.userName,
        this.registerForm.value.email,
        this.registerForm.value.password,
        this.registerForm.value.userType,
        this.registerForm.value.country,
      )
      .subscribe(
        (data) => {
          if (data) {
            this.router.navigateByUrl("/login");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
