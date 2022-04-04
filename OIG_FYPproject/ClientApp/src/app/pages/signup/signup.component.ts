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
  constructor(private userRegister: UserRegisterService,private router:Router) {}
  ngOnInit() {}
  //////////  ----   Reactive Form (Register)   ----  //////////
  registerForm = new FormGroup({
    userName: new FormControl(""),
    password: new FormControl(""),
    email: new FormControl(""),
  });
result:boolean;
  registerUser() {
    console.warn(this.registerForm.value);
    this.userRegister
      .registerUser(
        this.registerForm.value.userName,
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .subscribe(
        (data) => {
          if(data){
            this.router.navigateByUrl("/login");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }
}
